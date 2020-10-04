import {Meta} from '@storybook/react/types-6-0'
import React from 'react'
import {Detail} from './detail'
import {Provider} from './provider'

export default {
	title: 'Details',
	component: Detail,
	args: {
		sheet: 'Action',
		id: 7505,
	},
	decorators: [
		Story => (
			<Provider>
				<Story />
			</Provider>
		),
	],
} as Meta

export {Detail}
