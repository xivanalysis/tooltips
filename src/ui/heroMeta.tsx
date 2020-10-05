import {styled} from '@compiled/css-in-js'
import React, {ReactElement, ReactNode} from 'react'

export interface HeroMetaItem {
	name: string
	value: ReactNode
}

export interface HeroMetaProps {
	items: readonly HeroMetaItem[]
}

export function HeroMeta({items}: HeroMetaProps): ReactElement {
	return (
		<Container>
			{items.map((item, index) => (
				<Group key={index}>
					<Name>{item.name}</Name>
					<Value>{item.value}</Value>
				</Group>
			))}
		</Container>
	)
}

const Container = styled.div({
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'flex-end',

	borderTop: '1px solid #111',
	padding: 8,
	backgroundColor: 'rgba(0, 0, 0, 0.3)',
})

const Group = styled.div({
	position: 'relative',
	flexGrow: 0,
	flexShrink: 0,
	paddingBottom: 2,
	width: 'calc(100% / 3)',
	textAlign: 'right',

	'::after': {
		content: '',
		position: 'absolute',
		bottom: 0,
		right: 0,
		borderRadius: 5,
		background: 'rgba(255, 255, 255, 0.2)',
		width: '85%',
		height: 6,
	},
})

const PreventOverflow = styled.div({
	overflow: 'hidden',
	whiteSpace: 'nowrap',
	textOverflow: 'ellipsis',
})

const Name = styled(PreventOverflow)({
	color: '#ffc99a',
})

const Value = styled(PreventOverflow)({
	fontSize: 20,
	fontWeight: 'bold',
})
