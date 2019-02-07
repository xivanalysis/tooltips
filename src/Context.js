import React from 'react'

export const LOADING = Symbol('Loading data')

// Error function we're using when they have no provider
const noProvider = () => { throw new Error('No tooltip provider found!') }

export const {Provider, Consumer} = React.createContext({
	data: {},
	load: noProvider,
	baseUrl: '',
})
