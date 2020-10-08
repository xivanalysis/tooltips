import React, {
	ReactElement,
	ReactNode,
	useCallback,
	useMemo,
	useRef,
} from 'react'
import {Context, ContextValue, DataRequest, RequestGameData} from './context'
import {Data} from './data'
import debounce from 'debounce'

const DEFAULT_DEBOUNCE_DELAY = 50

interface DebounceResolution {
	promise: Promise<void>
	resolve: () => void
}

// Prettier actually breaks the `...infer T` on these and causes them to fail
// prettier-ignore
type Pop<T extends readonly unknown[]> = T extends readonly [...infer K, unknown]
	? Readonly<K>
	: never

// prettier-ignore
type DataCache<T extends readonly unknown[], V> = T extends readonly [infer K, ...infer R]
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

export interface ProviderProps {
	// TODO: Maybe allow overriding the entire fetch process so someone could use e.g. kobold?
	/** Base FFXIV API URL. Defaults to `https://xivapi.com` - any alternatives should match its schema. */
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
	baseUrl = 'https://xivapi.com',
	language = 'en',
	debounceDelay = DEFAULT_DEBOUNCE_DELAY,
	children,
}: ProviderProps): ReactElement {
	const requestQueue = useRef<DataRequest<Data>[]>([])
	const debounceResolution = useRef<DebounceResolution>()
	const data = useRef<DataCache<DataRequest<Data>, Data>>()

	const debouncedRequest = useMemo(
		() =>
			debounce(() => {
				// Grab references to the values we'll be processing this
				// execution, and clear out for the next consumer
				const currentQueue = requestQueue.current
				requestQueue.current = []

				const resolution = debounceResolution.current
				debounceResolution.current = undefined

				// Build groups for requests to the same resource
				// I'm keying by the value in the cache as it'll be a stable reference
				const requestGroups = new Map<
					Map<number, Data>,
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
					const columns = [...Object.keys(Data.columns ?? {}), 'ID'].join(',')
					const idsStr = [...ids.values()].join(',')
					const promise = fetch(
						`${baseUrl}/${sheet}?ids=${idsStr}&columns=${columns}&language=${language}`,
					)
						.then(resp => resp.json())
						.then(({Results}) => {
							// TODO: Handle pagination?
							// Save the fetched data into the data cache
							for (const result of Results) {
								const data = new Data()
								data.hydrate(result)
								cache.set(result.ID, data)
							}
						})
					promises.push(promise)
				}

				// Once all the promises are resolved, resolve the debounce promise to signal the data is ready
				Promise.all(promises).then(() => {
					resolution?.resolve()
				})
			}, debounceDelay),
		[debounceDelay, baseUrl],
	)

	const getCacheData = useCallback(
		<T extends Data>([Columns, language, sheet, id]: DataRequest<T>) =>
			data.current?.get(Columns)?.get(language)?.get(sheet)?.get(id) as
				| T
				| undefined,
		[],
	)

	const requestGameData = useCallback<RequestGameData>(
		async request => {
			// TODO: Check if data already has value and return early if so
			const value = getCacheData(request)
			if (value != null) {
				return value
			}

			// If there's no current debounce, set one up
			if (debounceResolution.current == null) {
				let resolve!: () => void
				const promise = new Promise<void>(internalResolve => {
					resolve = internalResolve
				})
				debounceResolution.current = {
					promise,
					resolve,
				}
			}

			// Push our request into the queue and wait for the request to resolve
			requestQueue.current.push(request)
			debouncedRequest()
			await debounceResolution.current.promise

			return getCacheData(request)
		},
		[getCacheData, debouncedRequest],
	)

	const value: ContextValue = useMemo(
		() => ({
			baseUrl,
			defaultLanguage: language,
			requestGameData,
		}),
		[baseUrl, language, requestGameData],
	)

	return <Context.Provider value={value}>{children}</Context.Provider>
}
