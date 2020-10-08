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
	const {defaultLanguage, requestGameData} = useContext(Context)
	const [data, setData] = useState<T>()

	// Resolve language pre-effect so we don't retap effect if the final language doesn't change
	const fetchLanguage = language ?? defaultLanguage

	useEffect(() => {
		requestGameData([columns, fetchLanguage, sheet, id]).then(data =>
			setData(data),
		)
	}, [requestGameData, sheet, columns, id, fetchLanguage])

	return data
}
