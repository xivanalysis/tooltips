import {useContext, useEffect, useState} from 'react'
import {Context} from './context'

// This isn't particularly typesafe, but hey, neither is xivapi.
export function useGameData<T extends object>({
	sheet,
	id,
	columns,
	language,
}: {
	sheet: string
	id: number
	columns: string[]
	language?: string
}): T | undefined {
	const {defaultLanguage, fetchGameData} = useContext(Context)
	const [data, setData] = useState<T>()

	// Resolve language pre-effect so we don't retap effect if the final language doesn't change
	const fetchLanguage = language ?? defaultLanguage

	useEffect(() => {
		fetchGameData({
			sheet,
			id,
			columns,
			language: fetchLanguage,
		}).then(data => setData(data as T))
	}, [fetchGameData, sheet, id, columns, fetchLanguage])

	return data
}
