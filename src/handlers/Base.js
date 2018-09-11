import PropTypes from 'prop-types'
import React from 'react'

import styles from './Base.module.css'

export default class Base extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
	}

	static columns = [
		'ID',
	]

	render() {
		return <div className={styles.tooltip}>
			{JSON.stringify(this.props.data)}
		</div>
	}
}
