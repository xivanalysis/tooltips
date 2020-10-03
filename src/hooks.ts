import {useContext, useEffect, useState} from 'react'
import {TooltipContext} from './context'

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
	const {language: contextLanguage, fetchGameData} = useContext(TooltipContext)
	const [data, setData] = useState<T>()

	// Resolve language pre-effect so we don't retap effect if the final language doesn't change
	const fetchLanguage = language ?? contextLanguage

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
