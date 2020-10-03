import React from 'react'
import {Label} from './label'
import {TooltipProvider} from './provider'

export default {
	title: 'Label',
	component: Label,
	decorators: [
		Story => (
			<TooltipProvider>
				<Story />
			</TooltipProvider>
		),
	],
}

export {Label}
