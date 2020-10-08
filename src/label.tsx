import {styled} from '@compiled/css-in-js'
import React, {memo, ReactElement} from 'react'
import {useGameData} from './hooks'
import {Data, column} from './data'
import {Icon} from './ui/icon'

class LabelData extends Data {
	@column('Name') name!: string
	@column('Icon') icon!: string
}

export interface LabelProps {
	/** XIV sheet to retrive data from. */
	sheet: string
	/** ID of the row to retrieve data for. */
	id: number
	/** Placeholder name shown when waiting for an API response. Defaults to 'Loading'. */
	placeholderName?: string
}

export const Label = memo(function Label({
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
		<Container>
			{data && <LabelIcon src={data.icon} />}
			<Text>{name}</Text>
		</Container>
	)
})

const Container = styled.span({
	display: 'inline-flex',
	alignItems: 'center',
})

const LabelIcon = styled(Icon)({
	height: '1.2em',
	marginRight: '0.2em',
})

const Text = styled.span({
	textDecoration: 'underline dotted',
})
