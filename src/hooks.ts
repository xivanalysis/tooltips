import {useContext, useEffect, useState} from 'react'
import {Context} from './context'
import {Data, DataConstructor} from './data'

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
