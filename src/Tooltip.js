import PropTypes from 'prop-types'
import React from 'react'

import {Consumer} from './Context'

export default class Tooltip extends React.PureComponent {
	static propTypes = {
		type: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
	}

	render() {
		return <Consumer>{({loadTooltip}) => {
			loadTooltip(this.props.type, this.props.id)
			return <span>{this.props.type}</span>
		}}
		</Consumer>
	}
}
