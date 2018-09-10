import React from 'react'

import {Consumer} from './Context'

export default class Tooltip extends React.Component {
	render() {
		return <Consumer>
			{({showTooltip}) => <button onClick={() => showTooltip()}>test</button>}
		</Consumer>
	}
}
