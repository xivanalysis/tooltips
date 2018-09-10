import {debounce} from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import {Provider as ReactProvider} from './Context'

const DEFAULT_DEBOUNCE_DELAY = 50

export default class Provider extends React.Component {
	static propTypes = {
		children: PropTypes.node,
		baseUrl: PropTypes.string,
		debounceDelay: PropTypes.number,
	}

	run = null
	pending = {}

	constructor(...args) {
		super(...args)

		this.state = {
			loadTooltip: this.loadTooltip.bind(this),
		}

		this.run = debounce(
			this._process.bind(this),
			this.props.debounceDelay || DEFAULT_DEBOUNCE_DELAY
		)
	}

	loadTooltip(type, id) {
		const typePending = this.pending[type] = this.pending[type] || []
		typePending.push(id)
		this.run()
	}

	_process() {
		const pending = this.pending
		this.pending = {}
		console.log(pending)
	}

	render() {
		return <ReactProvider value={this.state}>
			{this.props.children}
		</ReactProvider>
	}
}
