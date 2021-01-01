import {styled} from '@compiled/css-in-js'
import React, {memo, ReactElement} from 'react'
import {ErrorBoundary} from '../errorBoundary'
import {ActionContent} from './action'
import {BaseContent} from './base'

export interface DetailProps {
	/** XIV sheet to retrive data from. */
	sheet: string
	/** ID of the row to retrieve data for. */
	id: number

	// TODO: This effectively needs to be drilled + consumed by every content
	//       implementation. Look into deduplicating.
	/**
	 * Function called when the contents of the component have updated. Useful
	 * for recalculating tooltip locations if required, etc.
	 */
	onUpdate?: () => void
}

/** Component dispaying a detailed view of the specified game data. */
export const Detail = memo(function Detail(props: DetailProps): ReactElement {
	return (
		<Container>
			<ErrorBoundary>
				<Content {...props} />
			</ErrorBoundary>
			<Attribution
				href="https://xivapi.com"
				target="_blank"
				rel="noopener noreferrer"
			>
				xivapi.com
			</Attribution>
		</Container>
	)
})

function Content({sheet, ...props}: DetailProps) {
	switch (sheet.toLowerCase()) {
		case 'action':
			return <ActionContent {...props} />
		default:
			return <BaseContent sheet={sheet} {...props} />
	}
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
