import {styled} from '@compiled/react'
import React, {memo, ReactElement} from 'react'
import {useGameData} from './hooks'
import {Data, column} from './data'
import {ErrorBoundary} from './errorBoundary'

class LabelData extends Data {
	@column('Name') name!: string
	@column('Icon', {type: 'icon'}) icon!: string
}

export interface LabelProps {
	/** XIV sheet to retrive data from. */
	sheet: string
	/** ID of the row to retrieve data for. */
	id: number
	/** Placeholder name shown when waiting for an API response. Defaults to 'Loading'. */
	placeholderName?: string
}

/** Component displaying a simple label for the specified game data, with icon if available. */
export const Label = (props: LabelProps): ReactElement => (
	<ErrorBoundary>
		<LabelImplementation {...props} />
	</ErrorBoundary>
)

const LabelImplementation = memo(function Label({
	sheet,
	id,
	placeholderName,
}: LabelProps): ReactElement {
	const data = useGameData({
		sheet,
		columns: LabelData,
		id,
	})

	const name = data?.name ?? placeholderName ?? 'Loading'

	return (
		<>
			{data && <LabelIcon src={data.icon} />}
			<Text>{name}</Text>
		</>
	)
})

const LabelIcon = styled.img({
	marginRight: '0.2em',
	height: '1.2em',
	verticalAlign: 'middle',
})

const Text = styled.span({
	textDecoration: 'underline dotted',
})
