import {styled} from '@compiled/css-in-js'
import React, {ReactElement, ReactNode} from 'react'
import {MetaItem} from './meta'

interface HeaderProps {
	title: ReactNode
	subtitle?: ReactNode
	icon?: ReactNode
	meta?: MetaItem[]
}

export const Header = ({
	title,
	subtitle,
	icon,
	meta,
}: HeaderProps): ReactElement => (
	<HeaderWrapper>
		<IconWrapper>{icon}</IconWrapper>

		<TitleWrapper>
			<Title>{title}</Title>
			{subtitle && <SubTitle>{subtitle}</SubTitle>}
		</TitleWrapper>

		{meta && (
			<MetaWrapper>
				{meta.map(({name, value}, index) => (
					<React.Fragment key={index}>
						<MetaName>{name}</MetaName>
						<MetaValue>{value}</MetaValue>
					</React.Fragment>
				))}
			</MetaWrapper>
		)}
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
	flexGrow: 1,
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

const MetaWrapper = styled.dl({
	display: 'grid',
	gridTemplateColumns: 'auto auto',
	gap: '0 6px',
	margin: '0 15px 0 0',
	textAlign: 'right',
})

const MetaName = styled.dt({
	color: '#aaa',
})

const MetaValue = styled.dd({
	margin: 0,
})
