import {get} from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'

import {Consumer} from './Context'

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
		const {type, id} = this.props
		const {hovering} = this.state

		return <Consumer>{({data, load}) => {
			// Grab the data from the provider (using lodash because ez)
			const tooltipData = get(data, [type, id], null)

			// If the data hasn't been loaded yet, request it
			// TODO: Probably should have the data say if it's loading already
			if (!tooltipData) {
				load(this.props.type, this.props.id)
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
					<span>{JSON.stringify(tooltipData)}</span>,
					document.body
				)}
			</>
		}}
		</Consumer>
	}
}
