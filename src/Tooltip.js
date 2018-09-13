import {get} from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import Popup from 'reactjs-popup'

import {Consumer} from './Context'
import {getHandler} from './handlers'
import styles from './Tooltip.module.css'

const POPUP_STYLE = {
	border: 'none',
	padding: 0,
	width: 'auto',
	background: 'transparent',
	boxShadow: 'none',
}

export default class Tooltip extends React.PureComponent {
	static propTypes = {
		type: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
	}

	constructor(...args) {
		super(...args)

		this.state = {
			hovering: false,
		}
	}

	render() {
		// Pull in data from props and state
		const {
			type,
			id,
		} = this.props

		// Get the handler we'll be rendering for this type
		const Handler = getHandler(type)

		return <Consumer>{({baseUrl, data, load}) => {
			// Grab the data from the provider (using lodash because ez)
			const tooltipData = get(data, [type, id], null)

			// If the data hasn't been loaded yet, request it
			// TODO: Probably should have the data say if it's loading already
			if (!tooltipData) {
				load(type, id)
				return <span>Loading...</span>
			}

			// We've got the data we need, the tooltip
			return <Popup
				trigger={<span>
					<img
						src={baseUrl + tooltipData.icon}
						alt={tooltipData.name}
						className={styles.icon}
					/>
					{tooltipData.name}
				</span>}
				position="top left"
				on="hover"
				arrow={false}
				contentStyle={POPUP_STYLE}
				keepTooltipInside={true}
			>
				<Handler data={tooltipData} baseUrl={baseUrl}/>
			</Popup>
		}}
		</Consumer>
	}
}
