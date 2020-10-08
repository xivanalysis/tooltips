import {Meta} from '@storybook/react/types-6-0'
import React, {ReactElement} from 'react'
import {Detail as DetailComponent} from './detail'
import {DetailProps} from './detail/detail'
import {Provider} from './provider'

export default {
	title: 'Details',
	component: DetailComponent,
	args: {
		providerLanguage: 'en',
		sheet: 'Action',
		id: 7505,
	},
	argTypes: {
		providerLanguage: {
			control: {type: 'select', options: ['ja', 'en', 'de', 'fr']},
		},
	},
	decorators: [
		(Story, {args: {providerLanguage}}) => (
			<Provider language={providerLanguage}>
				<Story />
			</Provider>
		),
	],
} as Meta

export const Detail = (props: DetailProps): ReactElement => (
	<DetailComponent {...props} />
)
