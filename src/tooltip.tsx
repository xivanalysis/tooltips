import {styled} from '@compiled/react'
import React, {memo, ReactElement, useState} from 'react'
import {Detail} from './detail'
import {Label} from './label'

export interface TooltipProps {
	/** XIV sheet to retrive data from. */
	sheet: string
	/** ID of the row to retrieve data for. */
	id: number
}

/**
 * Naive tooltip component combining `Label`, with `Details` shown on hover. For more nuanced
 * popup handling,you'll want to implement the popup yourself using `Label` & `Details` directly.
 */
export const Tooltip = memo(function Tooltip({
	sheet,
	id,
}: TooltipProps): ReactElement {
	// Using a naive state implementation here rather than CSS-only to prevent every
	// single tooltip from requesting the full payload on mount
	const [hovering, setHovering] = useState(false)

	return (
		<Container
			onMouseEnter={() => setHovering(true)}
			onMouseLeave={() => setHovering(false)}
		>
			<Label sheet={sheet} id={id} />
			{hovering && (
				<Flyout>
					<Detail sheet={sheet} id={id} />
				</Flyout>
			)}
		</Container>
	)
})

const Container = styled.span({
	position: 'relative',
})

const Flyout = styled.div({
	position: 'absolute',
	top: '100%',
	left: 0,
})
