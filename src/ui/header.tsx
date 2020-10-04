import {styled} from '@compiled/css-in-js'
import React, {ReactElement} from 'react'

interface HeaderProps {
	title: string
	subtitle?: string
	icon?: string
}

export const Header = ({title, subtitle, icon}: HeaderProps): ReactElement => (
	<HeaderWrapper>
		<IconWrapper>{icon && <img src={icon} />}</IconWrapper>
		<TitleWrapper>
			<Title>{title}</Title>
			{subtitle && <SubTitle>{subtitle}</SubTitle>}
		</TitleWrapper>
	</HeaderWrapper>
)

const HeaderWrapper = styled.div({
	display: 'flex',
	alignItems: 'center',
	backgroundColor: 'rgba(0, 0, 0, .3)',
})

const IconWrapper = styled.div({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flex: '0 0 60px',
	height: 60,
	backgroundColor: '#111',
})

const TitleWrapper = styled.div({
	padding: '0 15px',
	minWidth: 0,
	whiteSpace: 'nowrap',

	'> *': {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
})

const Title = styled.div({
	fontSize: 16,
})

const SubTitle = styled.div({
	color: '#ffc99a',
	fontSize: 12,
})
