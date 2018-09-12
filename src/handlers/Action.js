import React from 'react'

import styles from './Action.module.css'
import Base from './Base'

const MELEE_RANGE = 3

export default class Action extends Base {
	static columns = {
		...Base.columns,
		icon: 'Icon',
		description: 'Description',

		actionCategory: 'ActionCategory.Name',
		resourceCost: 'Cost',
		range: 'Range',
		radius: 'EffectRange',

		castTime: 'Cast100ms',
		recastTime: 'Recast100ms',

		learntBy: 'ClassJob.Abbreviation',
		learntAt: 'ClassJobLevel',
		affinity: 'ClassJobCategory.Name',
	}

	render() {
		const {baseUrl, data} = this.props

		// Need to turn newlines into, like, _newlines_
		const description = data.description.replace(/\n/g, '<br/>')

		// Range === -1 seems to mean "melee distance", which is 3y
		let range = data.range
		if (range === -1) { range = MELEE_RANGE }

		// TODO: CostType handling
		//       Mana isn't 1:1
		// TODO: Anything that isn't on the tooltip for storm's path because that's the only example i've got right now

		return <div className={styles.tooltip}>
			<div className={styles.header}>
				<img src={baseUrl + data.icon} />
				{data.name}
				{data.actionCategory}
				Range {range}
				Radius {data.radius}
				Cast {data.castTime || 'Instant'}
				Recast {data.recastTime}
				Cost {data.resourceCost}
			</div>
			<p dangerouslySetInnerHTML={{__html: description}}/>
			Acquired {data.learntBy} {data.learntAt}
			Affinity {data.affinity}
		</div>
	}
}
