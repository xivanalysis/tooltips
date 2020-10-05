import React, {ReactElement, useContext} from 'react'
import {Context} from '../context'
import {column} from '../data'
import {useGameData} from '../hooks'
import {Description} from '../ui/description'
import {Header} from '../ui/header'
import {HeroMeta, HeroMetaItem} from '../ui/heroMeta'
import {BaseData} from './base'

const CAST_TIME_FACTOR = 0.1
const MANA_COST_FACTOR = 100

enum CostType {
	MP = 3,
	// TP = 5,
	GP = 7,
}

const costTypeName: Record<CostType, string> = {
	[CostType.MP]: 'MP',
	[CostType.GP]: 'GP',
}

class ActionData extends BaseData {
	@column('ActionCategory.Name') category?: string

	@column('Cast100ms') castTime!: number
	@column('Recast100ms') recastTime!: number

	@column('PrimaryCostType') costType!: CostType
	@column('PrimaryCostValue') cost!: number
}

export interface ActionContentProps {
	id: number
}

export function ActionContent({id}: ActionContentProps): ReactElement {
	const {baseUrl} = useContext(Context)
	const data = useGameData({
		sheet: 'Action',
		columns: ActionData,
		id,
	})

	const heroStats = data && getHeroStats(data)

	return (
		<>
			<Header
				title={data?.name ?? 'Loading'}
				subtitle={data?.category}
				icon={data?.icon && baseUrl + data.icon}
			/>

			{heroStats && <HeroMeta items={heroStats} />}

			{data && <Description html={data.description} />}
		</>
	)
}

function getHeroStats(data: ActionData) {
	// TODO: Work out how to localise this stuff
	const stats: HeroMetaItem[] = [
		{name: 'Cast', value: formatCastTime(data.castTime)},
	]

	// Don't display recast if it's 0
	if (data.recastTime > 0) {
		stats.push({
			name: 'Recast',
			value: formatCastTime(data.recastTime),
		})
	}

	// Only display costs if it's a known cost type - cost gets used
	// for features like gauge as well
	if (data.cost > 0 && CostType[data.costType] != null) {
		// Mana needs to be multiplied up for some dumb reason
		const value =
			data.costType === CostType.MP ? data.cost * MANA_COST_FACTOR : data.cost

		stats.push({
			name: costTypeName[data.costType] + ' Cost',
			value,
		})
	}

	return stats
}

const formatCastTime = (time: number) =>
	time == 0 ? 'Instant' : (time * CAST_TIME_FACTOR).toFixed(2) + 's'
