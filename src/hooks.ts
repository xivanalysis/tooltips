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
	const {defaultLanguage, fetchGameData} = useContext(Context)
	const [data, setData] = useState<T>()

	// Resolve language pre-effect so we don't retap effect if the final language doesn't change
	const fetchLanguage = language ?? defaultLanguage

	useEffect(() => {
		fetchGameData({sheet, columns, id, language: fetchLanguage}).then(data =>
			setData(data),
		)
	}, [fetchGameData, sheet, columns, id, fetchLanguage])

	return data
}
