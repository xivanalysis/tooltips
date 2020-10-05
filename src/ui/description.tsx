import '@compiled/css-in-js'
import React, {ReactElement} from 'react'

export interface DescriptionProps {
	html: string
}

export const Description = ({html}: DescriptionProps): ReactElement => (
	<p
		css={{
			margin: 0,
			borderTop: '1px solid #111',
			padding: 8,
			background: '#222',
			fontSize: 11,
		}}
		dangerouslySetInnerHTML={{
			// TODO: Pull in my description parser for this bullshit?
			__html: html.replace(/(\n|<br ?\/?>)+/g, '<br/>'),
		}}
	/>
)
