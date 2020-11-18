import {useContext, useEffect, useState} from 'react'
import {Context} from './context'
import {column, Data, DataConstructor} from './data'

export function useGameData<T extends Data>({
	sheet,
	columns,
	id,
	language,
}: {
	sheet: string
	columns: DataConstructor<T>
	id: number
	language?: string
}): T | undefined {
	const {defaultLanguage, getCachedData, requestGameData} = useContext(Context)
	const resolvedLanguage = language ?? defaultLanguage

	// Initialise the state from the cache, if there's anything there
	const [data, setData] = useState<T | undefined>(() =>
		getCachedData([columns, resolvedLanguage, sheet, id]),
	)

	// Send out a request for updated data. This will hit cache if it's already available.
	useEffect(() => {
		requestGameData([columns, resolvedLanguage, sheet, id]).then(data =>
			setData(data),
		)
	}, [requestGameData, sheet, columns, id, resolvedLanguage])

	return data
}

export type AddonStringDefintion = {
	id: number
	default?: string
}

export type AddonStrings<T extends string> = Record<T, string>

class AddonData extends Data {
	@column('Text') text!: string
}

export function useAddonStrings<T extends string>({
	ids,
	language,
}: {
	ids: Record<T, AddonStringDefintion>
	language?: string
}): AddonStrings<T> {
	const {defaultLanguage, getCachedData, requestGameData} = useContext(Context)
	const resolvedLanguage = language ?? defaultLanguage

	// Initialise the state from cache if possible, falling back to definition defaults
	const [strings, setStrings] = useState<AddonStrings<T>>(() => {
		const strings: Record<string, string> = {}
		for (const key in ids) {
			const definition = ids[key]
			const data = getCachedData([
				AddonData,
				resolvedLanguage,
				'Addon',
				definition.id,
			])
			strings[key] = data?.text ?? definition.default ?? 'Loading'
		}
		return strings as AddonStrings<T>
	})

	// Fire off requests for all the strings
	useEffect(() => {
		const promises = Object.keys(ids).map(key =>
			requestGameData([
				AddonData,
				resolvedLanguage,
				'Addon',
				ids[key as T].id,
			]).then(data => ({key, value: data?.text})),
		)

		Promise.all(promises).then(results => {
			setStrings(current => {
				const next = {...current} as Record<string, string>
				for (const result of results) {
					if (result.value == null) {
						continue
					}
					next[result.key] = result.value
				}
				return next as AddonStrings<T>
			})
		})
	}, [ids, requestGameData, resolvedLanguage])

	return strings
}
