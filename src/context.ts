import {createContext} from 'react'

export interface ContextValue {
	readonly defaultLanguage: string
	fetchGameData: (opts: {
		sheet: string
		id: number
		columns: string[]
		language: string
	}) => Promise<{[key: string]: unknown}>
}

const providerMissingError = new Error('No TooltipProvider found!')

export const Context = createContext<ContextValue>({
	get defaultLanguage(): string {
		throw providerMissingError
	},
	fetchGameData() {
		throw providerMissingError
	},
})
