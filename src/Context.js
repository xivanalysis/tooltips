import React from 'react'

// Error function we're using when they have no provider
const noProvider = () => { throw new Error('No tooltip provider found!') }

export const {Provider, Consumer} = React.createContext({
	data: {},
	loadTooltip: noProvider,
})
