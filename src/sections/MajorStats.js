import PropTypes from 'prop-types'
import React from 'react'

import styles from './MajorStats.module.css'

// Game seems to like displaying a few major statistics for... stuff... _really_ large
export default class MajorStats extends React.PureComponent {
	static propTypes = {
		stats: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.node.isRequired,
				value: PropTypes.node.isRequired,
			}),
		).isRequired,
	}

	render() {
		return <div className={styles.majorStats}>
			{this.props.stats.map((stat, i) => <div
				key={i}
				className={stat && styles.stat}
			>
				{stat && <>
					<div className={styles.name}>{stat.name}</div>
					<div className={styles.value}>{stat.value}</div>
				</>}
			</div>)}
		</div>
	}
}
