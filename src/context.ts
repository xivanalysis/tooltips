import {createContext} from 'react'
import {Data, DataConstructor} from './data'

export interface ContextValue {
	readonly baseUrl: string
	readonly defaultLanguage: string
	fetchGameData: <T extends Data>(opts: {
		sheet: string
		columns: DataConstructor<T>
		id: number
		language: string
	}) => Promise<T>
}

const providerMissingError = new Error('No TooltipProvider found!')

export const Context = createContext<ContextValue>({
	get baseUrl(): string {
		throw providerMissingError
	},
	get defaultLanguage(): string {
		throw providerMissingError
	},
	fetchGameData() {
		throw providerMissingError
	},
})
