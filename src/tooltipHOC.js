import {get} from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import {getHandler} from './handlers'
import {Consumer} from './Context'

export default Component => {
	class TooltipHOC extends React.PureComponent {
		static propTypes = {
			type: PropTypes.string.isRequired,
			id: PropTypes.number.isRequired,
		}

		render() {
			const {type, id} = this.props

			// Get the handler we'll be rendering for this type
			const Handler = getHandler(type)

			return <Consumer>{({baseUrl, data, load}) => {
				// Grab the data from the provider (using lodash because ez)
				const tooltipData = get(data, [type, id], null)
				const props = {
					baseUrl,
					loading: !tooltipData,
					data: tooltipData,
					Content: null,
				}

				// If the data hasn't been loaded yet, request it, otherwise prep a handler
				// TODO: Probably should have the data say if it's loading already
				if (!tooltipData) {
					load(type, id)
				} else {
					props.Content = () => <Handler data={tooltipData} baseUrl={baseUrl}/>
				}

				// Pass over control to the lucky user
				return <Component {...props}/>
			}}
			</Consumer>
		}
	}

	return TooltipHOC
}
