import React, {ReactNode} from 'react'
import {Context, ContextValue} from './context'

export interface ProviderProps {
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

export function Provider({
	baseUrl = 'https://xivapi.com/',
	language = 'en',
	children,
}: ProviderProps) {
	// TODO: memo/cb/etc
	const value: ContextValue = {
		defaultLanguage: language,
		fetchGameData: ({sheet, id, columns, language}) => {
			// TODO: request batching
			return fetch(
				`${baseUrl}${sheet}/${id}?columns=${columns.join(
					',',
				)}&language=${language}`,
			).then(resp => resp.json())
		},
	}

	return <Context.Provider value={value}>{children}</Context.Provider>
}
