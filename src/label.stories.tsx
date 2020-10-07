import {Meta} from '@storybook/react/types-6-0'
import React, {ReactElement} from 'react'
import {Label as LabelComponent, LabelProps} from './label'
import {Provider} from './provider'

export default {
	title: 'Label',
	component: LabelComponent,
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

export const Label = (props: LabelProps): ReactElement => (
	<LabelComponent {...props} />
)

export const MultipleLabels = (): ReactElement => (
	<>
		<LabelComponent sheet="Action" id={7505} />
		<LabelComponent sheet="Action" id={7507} />
		<LabelComponent sheet="Status" id={1} />
		<LabelComponent sheet="Status" id={2} />
	</>
)
