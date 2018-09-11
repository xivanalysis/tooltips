import React from 'react'

import styles from './Action.module.css'
import Base from './Base'

const MELEE_RANGE = 3

export default class Action extends Base {
	static columns = [
		...Base.columns,
		'ActionCategory.Name',
		'Cast100ms',
		'ClassJob.Abbreviation',
		'ClassJobCategory.Name',
		'ClassJobLevel',
		'Cost',
		'Description',
		'EffectRange',
		'Icon',
		'Name',
		'Range',
		'Recast100ms',
	]

	render() {
		const {baseUrl, data} = this.props

		// Need to turn newlines into, like, _newlines_
		const description = data.Description.replace(/\n/g, '<br/>')

		// Range === -1 seems to mean "melee distance", which is 3y
		let range = data.Range
		if (range === -1) { range = MELEE_RANGE }

		// TODO: CostType handling
		//       Mana isn't 1:1
		// TODO: Anything that isn't on the tooltip for storm's path because that's the only example i've got right now

		return <div className={styles.tooltip}>
			<div className={styles.header}>
				<img src={baseUrl + data.Icon} />
				{data.Name}
				{data.ActionCategory.Name}
				Range {range}
				Radius {data.EffectRange}
				Cast {data.Cast100ms || 'Instant'}
				Recast {data.Recast100ms}
				Cost {data.Cost}
			</div>
			<p dangerouslySetInnerHTML={{__html: description}}/>
			Acquired {data.ClassJob.Abbreviation} {data.ClassJobLevel}
			Affinity {data.ClassJobCategory.Name}
		</div>
	}
}
