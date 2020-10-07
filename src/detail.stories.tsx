import {Meta} from '@storybook/react/types-6-0'
import React, {ReactElement} from 'react'
import {Detail as DetailComponent} from './detail'
import {DetailProps} from './detail/detail'
import {Provider} from './provider'

export default {
	title: 'Details',
	component: DetailComponent,
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

export const Detail = (props: DetailProps): ReactElement => (
	<DetailComponent {...props} />
)
