import {createContext} from 'react'

export interface TooltipContextValue {
	readonly language: string
	fetchGameData: (opts: {
		sheet: string
		id: number
		columns: string[]
		language: string
	}) => Promise<{[key: string]: unknown}>
}

const providerMissingError = new Error('No TooltipProvider found!')

export const TooltipContext = createContext<TooltipContextValue>({
	get language(): string {
		throw providerMissingError
	},
	fetchGameData() {
		throw providerMissingError
	},
})
