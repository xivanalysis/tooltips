import React, {ReactNode} from 'react'
import {TooltipContext, TooltipContextValue} from './context'

export interface TooltipProviderProps {
	// TODO: Maybe allow overriding the entire fetch process so someone could use e.g. kobold?
	/** Base FFXIV API URL. Defaults to `https://xivapi.com/` - any alternatives should match its schema. */
	baseUrl?: string
	/**
	 * Language to render tooltips in. Defaults to `en`. Accepts any values permitted on
	 * the `language` query parameter by the API specified by `baseUrl`.
	 */
	language?: string
	children?: ReactNode
}

export function TooltipProvider({
	baseUrl = 'https://xivapi.com/',
	language = 'en',
	children,
}: TooltipProviderProps) {
	// TODO: memo/cb/etc
	const value: TooltipContextValue = {
		language,
		fetchGameData: () => {
			return Promise.resolve({example: 'data'})
		},
	}

	return (
		<TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>
	)
}
