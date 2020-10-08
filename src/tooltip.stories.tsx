import {Meta} from '@storybook/react/types-6-0'
import {LoremIpsum} from 'lorem-ipsum'
import React, {ReactElement} from 'react'
import {Provider} from './provider'
import {TooltipProps, Tooltip as TooltipComponent} from './tooltip'

export default {
	title: 'Tooltip',
	component: TooltipComponent,
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

const lorem = new LoremIpsum({})

export const Tooltip = (props: TooltipProps): ReactElement => (
	<>
		{lorem.generateWords(50)}
		&nbsp;
		<TooltipComponent {...props} />
		&nbsp;
		{lorem.generateWords(50)}
	</>
)
