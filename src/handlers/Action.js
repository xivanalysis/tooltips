import React from 'react'

import styles from './Action.module.css'
import Base from './Base'

export default class Action extends Base {
	static columns = [
		...Base.columns,
		'Description',
		'Icon',
		'Name',
	]

	render() {
		const {baseUrl, data} = this.props

		// Need to turn newlines into, like _newlines_
		const description = data.Description.replace(/\n/g, '<br/>')

		return <div className={styles.tooltip}>
			<img src={baseUrl + data.Icon}/>
			<p dangerouslySetInnerHTML={{__html: description}}/>
		</div>
	}
}
