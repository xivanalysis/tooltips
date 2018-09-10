import PropTypes from 'prop-types'
import React from 'react'

import {Provider as ReactProvider} from './Context'

export default class Provider extends React.Component {
	static propTypes = {
		children: PropTypes.node,
	}

	constructor(...args) {
		super(...args)

		this.state = {
			showTooltip: this.showTooltip.bind(this),
		}
	}

	showTooltip() {
		console.log('show tooltip')
	}

	render() {
		return <ReactProvider value={this.state}>
			{this.props.children}
		</ReactProvider>
	}
}
