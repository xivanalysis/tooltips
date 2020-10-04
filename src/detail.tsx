import {styled} from '@compiled/css-in-js'
import React, {ReactElement, useContext} from 'react'
import {Context} from './context'
import {column, Data} from './data'
import {useGameData} from './hooks'
import {Header} from './ui/header'

class DetailData extends Data {
	@column('Name') name!: string
	@column('Icon') icon!: string
	@column('Description') description!: string

	// TODO: This shouldn't be on the main detail - break out header component.
	@column('ActionCategory.Name') category?: string
}

export interface DetailProps {
	/** XIV sheet to retrive data from. */
	sheet: string
	/** ID of the row to retrieve data for. */
	id: number
}

export function Detail({sheet, id}: DetailProps): ReactElement {
	const {baseUrl} = useContext(Context)
	const data = useGameData({
		sheet,
		columns: DetailData,
		id,
	})

	console.log(data)

	return (
		<Container>
			<Header
				title={data?.name ?? 'Loading'}
				subtitle={data?.category}
				icon={data?.icon && baseUrl + data.icon}
			/>
			{data && (
				<Description
					dangerouslySetInnerHTML={{
						// TODO: Pull in my description parser for this bullshit?
						__html: data.description.replace(/(\n|<br ?\/?>)+/g, '<br/>'),
					}}
				/>
			)}
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

const Description = styled.p({
	margin: 0,
	borderTop: '1px solid #111',
	padding: 8,
	background: '#222',
	fontSize: 11,
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
