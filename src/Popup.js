import PropTypes from 'prop-types'
import React from 'react'

export default class Popup extends React.PureComponent {
	static propTypes = {
		data: PropTypes.object.isRequired,
	}

	render() {
		return JSON.stringify(this.props.data)
	}
}
