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
			{/* Header */}
			<div className={styles.header}>
				<div className={styles.iconHolder}>
					<img src={baseUrl + data.icon}/>
				</div>

				<div className={styles.titleContainer}>
					<div className={styles.name}>{data.name}</div>
					<div className={styles.category}>{data.actionCategory}</div>
				</div>

				<dl className={styles.headerMeta}>
					<dt>Range</dt><dd>{range}y</dd>
					<dt>Radius</dt><dd>{data.radius}y</dd>
				</dl>
			</div>

			{/* Major stats that the game displays massive for w/e reason */}
			<div className={styles.majorStats}>
				<div>
					<div className={styles.key}>Cast</div>
					<div className={styles.value}>{data.castTime || 'Instant'}</div>
				</div>
				<div>
					<div className={styles.key}>Recast</div>
					<div className={styles.value}>{data.recastTime}</div>
				</div>
				<div>
					<div className={styles.key}>Cost</div>
					<div className={styles.value}>{data.resourceCost}</div>
				</div>
			</div>

			{/* Description */}
			<p
				className={styles.description}
				dangerouslySetInnerHTML={{__html: description}}
			/>

			{/* Meta */}
			<dl className={styles.meta}>
				<dt>Acquired</dt><dd>{data.learntBy} {data.learntAt}</dd>
				<dt>Affinity</dt><dd>{data.affinity}</dd>
			</dl>
		</div>
	}
}
