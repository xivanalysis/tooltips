import React from 'react'

import MajorStats from '../sections/MajorStats'
import styles from './Action.module.css'
import Base from './Base'

const MELEE_RANGE = 3
const CAST_TIME_DIVISOR = 10

// Only get costTypes as IDs
const COST_TYPE = {
	MP: 3,
	TP: 5,
	GP: 7,
}

// Overkill? Overkill.
const COST_TYPE_NAME = {
	[COST_TYPE.MP]: 'MP',
	[COST_TYPE.TP]: 'TP',
	[COST_TYPE.GP]: 'GP',
}

export default class Action extends Base {
	static columns = {
		...Base.columns,

		category: 'ActionCategory.Name',
		range: 'Range',
		radius: 'EffectRange',

		castTime: 'Cast100ms',
		recastTime: 'Recast100ms',

		costType: 'CostType',
		cost: 'Cost',

		learntBy: 'ClassJob.Abbreviation',
		learntAt: 'ClassJobLevel',
		affinity: 'ClassJobCategory.Name',
	}

	// TODO: This needs to be abstracted into a shared lib at some point
	_calculateManaCost(costFactor) {
		// TODO: Only handling lv70 atm
		const levelModifier = 12000

		return Math.floor(costFactor * levelModifier/100)
	}

	renderHeader() {
		const {data} = this.props

		// Range === -1 seems to mean "melee distance", which is 3y
		let range = data.range
		if (range === -1) { range = MELEE_RANGE }

		return <>
			{super.renderHeader()}
			<dl className={styles.headerMeta}>
				<dt>Range</dt><dd>{range}y</dd>
				<dt>Radius</dt><dd>{data.radius}y</dd>
			</dl>
		</>
	}

	renderDescription() {
		const {data} = this.props

		// Cast times are stored in 100ms units
		const castTime = data.castTime ?
			(data.castTime / CAST_TIME_DIVISOR).toFixed(2) + 's' :
			'Instant'

		// Cast time is always shown
		const majorStats = [
			{name: 'Cast', value: castTime},
		]

		// Only show recast if it's >0
		majorStats.push(data.recastTime ?
			{name: 'Recast', value: (data.recastTime / CAST_TIME_DIVISOR).toFixed(2) + 's'} :
			null
		)

		// Only show cost if there is one and it's one of the costs we support (gauge shows up in the same fields)
		if (data.cost && COST_TYPE_NAME[data.costType]) {
			let cost = data.cost

			if (data.costType === COST_TYPE.MP) {
				cost = this._calculateManaCost(cost)
			}

			majorStats.push({
				name: COST_TYPE_NAME[data.costType] + ' Cost',
				value: cost,
			})
		}

		return <>
			<MajorStats stats={majorStats} />
			{super.renderDescription()}
		</>
	}

	renderFooter() {
		const {data} = this.props

		return <table className={styles.meta}>
			<tbody>
				<tr><th scope="row">Acquired</th><td>{data.learntBy} Lv. {data.learntAt}</td></tr>
				<tr><th scope="row">Affinity</th><td>{data.affinity}</td></tr>
			</tbody>
		</table>
	}
}
