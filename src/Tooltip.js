import {get} from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'

import {Consumer} from './Context'
import {getHandler} from './handlers'

export default class Tooltip extends React.PureComponent {
	static propTypes = {
		type: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		mountNode: PropTypes.instanceOf(Element),
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
			mountNode = document.body,
		} = this.props
		const {hovering} = this.state

		// Get the handler we'll be rendering for this type
		const Handler = getHandler(type)

		return <Consumer>{({data, load}) => {
			// Grab the data from the provider (using lodash because ez)
			const tooltipData = get(data, [type, id], null)

			// If the data hasn't been loaded yet, request it
			// TODO: Probably should have the data say if it's loading already
			if (!tooltipData) {
				load(type, id)
				return <span>Loading...</span>
			}

			// We've got the data we need, render link + tooltip
			return <>
				<span
					onMouseEnter={() => this.setState({hovering: true})}
					onMouseLeave={() => this.setState({hovering: false})}
				>
					{tooltipData.Name}
				</span>
				{hovering && ReactDOM.createPortal(
					<Handler data={tooltipData}/>,
					mountNode
				)}
			</>
		}}
		</Consumer>
	}
}
