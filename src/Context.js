import React from 'react'

export const {Provider, Consumer} = React.createContext({
	showTooltip: () => {
		throw new Error('No tooltip provider found!')
	},
})
