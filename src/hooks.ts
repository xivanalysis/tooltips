import {useContext, useEffect, useState} from 'react'
import {Context} from './context'
import {Data, DataConstructor} from './data'

export function useGameData<T extends Data>({
	sheet,
	id,
	language,
}: {
	sheet: DataConstructor<T>
	id: number
	language?: string
}): T | undefined {
	const {defaultLanguage, fetchGameData} = useContext(Context)
	const [data, setData] = useState<T>()

	// Resolve language pre-effect so we don't retap effect if the final language doesn't change
	const fetchLanguage = language ?? defaultLanguage

	useEffect(() => {
		fetchGameData({sheet, id, language: fetchLanguage}).then(data =>
			setData(data),
		)
	}, [fetchGameData, sheet, id, fetchLanguage])

	return data
}
