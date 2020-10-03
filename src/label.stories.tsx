import React from 'react'
import {Label} from './label'
import {Provider} from './provider'

export default {
	title: 'Label',
	component: Label,
	decorators: [
		Story => (
			<Provider>
				<Story />
			</Provider>
		),
	],
}

export {Label}
