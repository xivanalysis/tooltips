import {styled} from '@compiled/css-in-js'
import React, {ReactElement, ReactNode} from 'react'

export interface MetaItem {
	name: string
	value: ReactNode
}

export interface MetaProps {
	items: readonly MetaItem[]
}

export function Meta({items}: MetaProps): ReactElement {
	return (
		<Container>
			{items.map((item, index) => (
				<React.Fragment key={index}>
					<Name key={index}>{item.name}</Name>
					<Value>{item.value}</Value>
				</React.Fragment>
			))}
		</Container>
	)
}

const Container = styled.dl({
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	margin: 0,
	borderTop: '1px solid #111',
	padding: 8,
})

const Name = styled.dt({
	color: '#ffc99a',
	paddingRight: '1em',
})

const Value = styled.dd({
	margin: 0,
})
