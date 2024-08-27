import React, {
	ReactElement,
	ReactNode,
	useCallback,
	useMemo,
	useRef,
} from 'react'
import {
	Context,
	ContextValue,
	DataRequest,
	GetCachedData,
	RequestGameData,
} from './context'
import {BoilmasterSheetResponse, Data} from './data'
import {useAsyncDebounce} from './debounce'

const DEFAULT_DEBOUNCE_DELAY = 50

type ROUnk = readonly unknown[]

type Pop<T extends ROUnk> = T extends readonly [...infer K, unknown]
	? Readonly<K>
	: never

type DataCache<T extends ROUnk, V> = T extends readonly [infer K, ...infer R]
	? Map<K, DataCache<R, V>>
	: V

type MapKey<M extends Map<unknown, unknown>> = M extends Map<infer K, unknown>
	? K
	: never

type MapValue<M extends Map<unknown, unknown>> = M extends Map<unknown, infer V>
	? V
	: never

function getWithDefault<M extends Map<unknown, unknown>>(
	map: M,
	key: MapKey<M>,
	factory: () => MapValue<M>,
): MapValue<M> {
	let value = map.get(key) as MapValue<M>
	if (value == null) {
		value = factory()
		map.set(key, value)
	}
	return value
}

type CacheValue<T extends Data> =
	| {status: 'pending'; promise: Promise<void>}
	| {status: 'fulfilled'; data: T}

export interface ProviderProps {
	// TODO: Maybe allow overriding the entire fetch process so someone could use e.g. kobold?
	/** Base FFXIV API URL. Defaults to `https://beta.xivapi.com/api/1` - any alternatives should match its schema. */
	baseUrl?: string
	/**
	 * Language to render tooltips in. Defaults to `en`. Accepts any values permitted on
	 * the `language` query parameter by the API specified by `baseUrl`.
	 */
	language?: string
	/** Debounce duration in ms to hold before requesting data from API. Default 50. */
	debounceDelay?: number
	children?: ReactNode
}

export function Provider({
	baseUrl = 'https://beta.xivapi.com/api/1',
	language = 'en',
	debounceDelay = DEFAULT_DEBOUNCE_DELAY,
	children,
}: ProviderProps): ReactElement {
	const requestQueue = useRef<DataRequest<Data>[]>([])
	const data = useRef<DataCache<DataRequest<Data>, CacheValue<Data>>>()

	// Main request handler that hits the API. Debounced to prevent flooding requests.
	const initiateRequests = useCallback(() => {
		// Grab references to the values we'll be processing this
		// execution, and clear out for the next consumer
		const currentQueue = requestQueue.current
		requestQueue.current = []

		// Build groups for requests to the same resource
		// I'm keying by the value in the cache as it'll be a stable reference
		const requestGroups = new Map<
			Map<number, CacheValue<Data>>,
			{request: Pop<DataRequest<Data>>; ids: Set<number>}
		>()
		for (const [Constructor, language, sheet, id] of currentQueue) {
			// Drill down to the pending IDs
			if (data.current == null) {
				data.current = new Map()
			}
			const languageCache = getWithDefault(
				data.current,
				Constructor,
				() => new Map(),
			)
			const sheetCache = getWithDefault(
				languageCache,
				language,
				() => new Map(),
			)
			const idCache = getWithDefault(sheetCache, sheet, () => new Map())

			// Make sure we have a set and add it
			const group = getWithDefault(requestGroups, idCache, () => ({
				request: [Constructor, language, sheet] as const,
				ids: new Set<number>(),
			}))
			group.ids.add(id)
		}

		// Fetch the final data for the requests
		const promises: Promise<void>[] = []
		for (const [cache, {request, ids}] of requestGroups.entries()) {
			const [Data, language, sheet] = request

			const columns = Object.entries(Data.columns ?? {})
			const fields = columns
				.filter(([, options]) => options.source === 'fields')
				.map(([, options]) => options.column)
				.join(',')
			const transient = columns
				.filter(([, options]) => options.source === 'transient')
				.map(([, options]) => options.column)
				.join(',')

			const idsStr = [...ids.values()].join(',')
			const promise = fetch(
				`${baseUrl}/sheet/${sheet}?rows=${idsStr}&limit=${ids.size}&fields=${fields}&transient=${transient}&language=${language}`,
			)
				.then(resp => resp.json())
				.then(({rows}: BoilmasterSheetResponse) => {
					// TODO: Handle pagination?
					// Save the fetched data into the data cache
					for (const row of rows) {
						const data = new Data()
						data.hydrate(row, {baseUrl})
						cache.set(row.row_id, {status: 'fulfilled', data})
					}
				})
			promises.push(promise)
			ids.forEach(id => cache.set(id, {status: 'pending', promise}))
		}

		return Promise.all(promises)
	}, [baseUrl])

	const debouncedRequest = useAsyncDebounce(initiateRequests, debounceDelay)

	// Cache value lookup
	const getCacheValue = useCallback(
		<T extends Data>([Columns, language, sheet, id]: DataRequest<T>):
			| CacheValue<T>
			| undefined =>
			data.current?.get(Columns)?.get(language)?.get(sheet)?.get(id) as
				| CacheValue<T>
				| undefined,
		[],
	)

	// Convenience wrapper arouund the cache values to hide the promise structure from consumers
	const getCachedData = useCallback<GetCachedData>(
		<T extends Data>(request: DataRequest<T>) => {
			const cacheValue = getCacheValue(request)

			return cacheValue?.status === 'fulfilled'
				? (cacheValue.data as T)
				: undefined
		},
		[getCacheValue],
	)

	// Initiate a request for game data
	const requestGameData = useCallback<RequestGameData>(
		async request => {
			// Check the cache to see if we need to do a request at all. It may have
			// already been fulfilled, or already be pending on network.
			const value = getCacheValue(request)
			if (value?.status === 'fulfilled') {
				return value.data
			}
			if (value?.status === 'pending') {
				await value.promise
				return getCachedData(request)
			}

			// Push our request into the queue and wait for the request to resolve
			requestQueue.current.push(request)
			await debouncedRequest()

			return getCachedData(request)
		},
		[getCachedData, getCacheValue, debouncedRequest],
	)

	const value: ContextValue = useMemo(
		() => ({
			baseUrl,
			defaultLanguage: language,
			getCachedData,
			requestGameData,
		}),
		[baseUrl, language, getCachedData, requestGameData],
	)

	return <Context.Provider value={value}>{children}</Context.Provider>
}
