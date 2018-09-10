import axios from 'axios'
import {debounce, merge} from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import {Provider as ReactProvider} from './Context'

const DEFAULT_BASE_URL = 'https://xivapi.com/'
const DEFAULT_DEBOUNCE_DELAY = 50

export default class Provider extends React.Component {
	static propTypes = {
		children: PropTypes.node,
		baseUrl: PropTypes.string,
		debounceDelay: PropTypes.number,
	}

	// I like axios. Fight me.
	endpoint = null

	// Request queue handling
	run = null
	pending = {}

	constructor(...args) {
		super(...args)

		// Set up the state, it will be passed out to consumers
		this.state = {
			data: {},
			loadTooltip: this.loadTooltip.bind(this),
		}

		// Set up our endpoint with axios.
		this.endpoint = axios.create({
			baseURL: this.props.baseUrl || DEFAULT_BASE_URL,
		})

		// Set up the debounced processing func
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

		// We need to do a seperate request for each content type
		Object.entries(pending).forEach(([type, ids]) => {
			// This will be requesting way too much data OOTB
			// TODO: Proper handlers
			// TODO: Pagination
			this.endpoint.get(type, {
				params: {
					ids: ids.join(','),
				},
			}).then(response => {
				// TODO: Sanity check the response
				const results = response.data.Results
				const keyedResults = results.reduce((carry, content) => {
					carry[content.ID] = content
					return carry
				}, {})

				this.setState(state => merge({}, state, {
					data: {
						[type]: keyedResults,
					},
				}))
			})
		})
	}

	render() {
		return <ReactProvider value={this.state}>
			{this.props.children}
		</ReactProvider>
	}
}
