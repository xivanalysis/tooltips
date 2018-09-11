import PropTypes from 'prop-types'
import React from 'react'

export default class Base extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		baseUrl: PropTypes.string.isRequired,
	}

	static columns = [
		'ID',
	]

	render() {
		return JSON.stringify(this.props.data)
	}
}
