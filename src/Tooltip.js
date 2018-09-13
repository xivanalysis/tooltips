import PropTypes from 'prop-types'
import React from 'react'
import Popup from 'reactjs-popup'

import tooltipHOC from './tooltipHOC'

import styles from './Tooltip.module.css'

const POPUP_STYLE = {
	border: 'none',
	padding: 0,
	width: 'auto',
	background: 'transparent',
	boxShadow: 'none',
}

class Tooltip extends React.PureComponent {
	static propTypes = {
		baseUrl: PropTypes.string,
		loading: PropTypes.bool.isRequired,
		data: PropTypes.object,
		Content: PropTypes.node,
	}

	render() {
		// Pull in data from props and state
		const {
			baseUrl,
			loading,
			data,
			Content,
		} = this.props

		if (loading) {
			return <span>Loading...</span>
		}

		// We've got the data we need, the tooltip
		return <Popup
			trigger={<span>
				<img
					src={baseUrl + data.icon}
					alt={data.name}
					className={styles.icon}
				/>
				{data.name}
			</span>}
			position="top left"
			on="hover"
			arrow={false}
			contentStyle={POPUP_STYLE}
			keepTooltipInside={true}
		>
			<Content/>
		</Popup>
	}
}

export default tooltipHOC(Tooltip)
