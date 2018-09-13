import PropTypes from 'prop-types'
import React from 'react'

import styles from './Base.module.css'

export default class Base extends React.Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		baseUrl: PropTypes.string.isRequired,
	}

	static columns = {
		id: 'ID',
		name: 'Name',
		icon: 'Icon',
		description: 'Description',
	}

	render() {
		return <div className={styles.tooltip}>
			<div className={styles.header}>
				{this.renderHeader()}
			</div>

			{this.renderDescription()}

			{this.renderFooter()}

			{/* :bloblove: */}
			<a
				href="https://xivapi.com/"
				target="_blank"
				rel="noopener noreferrer"
				className={styles.attribution}
			>
				xivapi.com
			</a>
		</div>
	}

	renderHeader() {
		const {baseUrl, data} = this.props

		return <>
			<div className={styles.iconHolder}>
				<img src={baseUrl + data.icon} />
			</div>

			<div className={styles.titleContainer}>
				<div className={styles.name}>{data.name}</div>
				{data.category && <div className={styles.category}>{data.category}</div>}
			</div>
		</>
	}

	renderDescription() {
		const {data} = this.props

		// Need to turn newlines into, like, _newlines_
		const description = data.description.replace(/\n/g, '<br/>')
		return <p
			className={styles.description}
			dangerouslySetInnerHTML={{__html: description}}
		/>
	}

	renderFooter() {
		return null
	}
}
