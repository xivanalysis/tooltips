import {createContext} from 'react'
import {Data, DataConstructor} from './data'

// [DataDefinition, Language, SheetName, ID]
export type DataRequest<T extends Data> = Readonly<
	[DataConstructor<T>, string, string, number]
>

export type GetCachedData = <T extends Data>(
	request: DataRequest<T>,
) => T | undefined

export type RequestGameData = <T extends Data>(
	request: DataRequest<T>,
) => Promise<T | undefined>

export interface ContextValue {
	readonly baseUrl: string
	readonly defaultLanguage: string
	getCachedData: GetCachedData
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
	getCachedData() {
		throw providerMissingError
	},
	requestGameData() {
		throw providerMissingError
	},
})
