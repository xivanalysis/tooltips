import {Meta} from '@storybook/react/types-6-0'
import React, {ReactElement} from 'react'
import {Label} from './label'
import {Provider} from './provider'

export default {
	title: 'Label',
	component: Label,
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

export {Label}

export const MultipleLabels = (): ReactElement => (
	<>
		<Label sheet="Action" id={7505} />
		<Label sheet="Action" id={7507} />
		<Label sheet="Status" id={1} />
		<Label sheet="Status" id={2} />
	</>
)
