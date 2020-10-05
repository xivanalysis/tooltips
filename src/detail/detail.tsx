import {styled} from '@compiled/css-in-js'
import React, {ReactElement} from 'react'
import {BaseContent} from './base'

export interface DetailProps {
	/** XIV sheet to retrive data from. */
	sheet: string
	/** ID of the row to retrieve data for. */
	id: number
}

export function Detail({sheet, id}: DetailProps): ReactElement {
	return (
		<Container>
			<BaseContent sheet={sheet} id={id} />
			<Attribution
				href="https://xivapi.com"
				target="_blank"
				rel="noopener noreferrer"
			>
				xivapi.com
			</Attribution>
		</Container>
	)
}

const Container = styled.div({
	boxSizing: 'border-box',
	'*': {boxSizing: 'border-box'},

	position: 'relative',
	border: '1px solid #111',
	borderRadius: 5,
	width: 330,
	background: '#282828',
	color: 'white',
	font: `12px/18px Arial, 'Helvetica Neue', Helvetica, sans-serif`,
	boxShadow: 'inset 0 0 3px #444, 0 0 10px 2px #111',
})

const Attribution = styled.a({
	position: 'absolute',
	bottom: 0,
	right: 0,
	display: 'block',
	fontSize: 10,
	lineHeight: '10px',
	padding: 3,
	color: '#666',
	textAlign: 'right',
	textDecoration: 'none',
})
