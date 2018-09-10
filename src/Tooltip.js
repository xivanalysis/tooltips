import {get} from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import {Consumer} from './Context'

export default class Tooltip extends React.PureComponent {
	static propTypes = {
		type: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
	}

	render() {
		const {type, id} = this.props
		return <Consumer>{({data, loadTooltip}) => {
			const tooltipData = get(data, [type, id], null)
			if (!tooltipData) {
				loadTooltip(this.props.type, this.props.id)
				return <span>Loading...</span>
			}

			return <span>{tooltipData.Name}</span>
		}}
		</Consumer>
	}
}
