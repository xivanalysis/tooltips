import {createContext} from 'react'
import {Data, DataConstructor} from './data'

// [DataDefinition, Language, SheetName, ID]
export type DataRequest<T extends Data> = Readonly<
	[DataConstructor<T>, string, string, number]
>

export type RequestGameData = <T extends Data>(
	request: DataRequest<T>,
) => Promise<T | undefined>

export interface ContextValue {
	readonly baseUrl: string
	readonly defaultLanguage: string
	requestGameData: RequestGameData
}

const providerMissingError = new Error('No TooltipProvider found!')

export const Context = createContext<ContextValue>({
	get baseUrl(): string {
		throw providerMissingError
	},
	get defaultLanguage(): string {
		throw providerMissingError
	},
	requestGameData() {
		throw providerMissingError
	},
})
