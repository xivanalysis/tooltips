import React, {ComponentType, ReactElement} from 'react'
import {Label} from './label'
import {Provider} from './provider'

export default {
	title: 'Label',
	component: Label,
	args: {
		sheet: 'Action',
		id: 3569,
	},
	decorators: [
		(Story: ComponentType): ReactElement => (
			<Provider>
				<Story />
			</Provider>
		),
	],
}

export {Label}

export const MultipleLabels = (): ReactElement => (
	<>
		<Label sheet="Action" id={7505} />
		<Label sheet="Action" id={7507} />
	</>
)
