import {styled} from '@compiled/css-in-js'
import React, {ReactElement, useContext} from 'react'
import {useGameData} from './hooks'
import {Data, column} from './data'
import {Context} from './context'

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

export function Label({sheet, id, placeholderName}: LabelProps): ReactElement {
	const {baseUrl} = useContext(Context)
	const data = useGameData({
		sheet,
		columns: LabelData,
		id,
	})

	const name = data?.name ?? placeholderName ?? 'Loading'

	return (
		<Container>
			{data && <Icon src={baseUrl + data.icon} />}
			<Text>{name}</Text>
		</Container>
	)
}

const Container = styled.span({
	display: 'inline-flex',
	alignItems: 'center',
})

const Icon = styled.img({
	height: '1.2em',
	marginRight: '0.2em',
})

const Text = styled.span({
	textDecoration: 'underline dotted',
})
