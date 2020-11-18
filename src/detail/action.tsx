import React, {ReactElement, useEffect} from 'react'
import {column} from '../data'
import {AddonStrings, useAddonStrings, useGameData} from '../hooks'
import {Description} from '../ui/description'
import {Header} from '../ui/header'
import {HeroMeta} from '../ui/heroMeta'
import {Meta, MetaItem} from '../ui/meta'
import {BaseData} from './base'
import {DetailProps} from './detail'

const CAST_TIME_FACTOR = 0.1
const MANA_COST_FACTOR = 100
const MELEE_RANGE = 3

enum CostType {
	MP = 3,
	// TP = 5,
	GP = 7,
}

const addonIds = {
	instant: {id: 699, default: 'Instant'},
	cast: {id: 701, default: 'Cast'},
	recast: {id: 702, default: 'Recast'},
	mpCost: {id: 705, default: 'MP Cost'},
	gpCost: {id: 708, default: 'GP Cost'},
	range: {id: 709, default: 'Range'},
	radius: {id: 710, default: 'Radius'},
	acquired: {id: 711, default: 'Acquired'},
	affinity: {id: 712, default: 'Affinity'},
}

type StringKey = keyof typeof addonIds

const costTypeName: Record<CostType, StringKey> = {
	[CostType.MP]: 'mpCost',
	[CostType.GP]: 'gpCost',
}

type ActionAddonStrings = AddonStrings<keyof typeof addonIds>

class ActionData extends BaseData {
	@column('ActionCategory.Name') category?: string
	@column('Range') range!: number
	@column('EffectRange') radius!: number

	@column('Cast100ms') castTime!: number
	@column('Recast100ms') recastTime!: number

	@column('PrimaryCostType') costType!: CostType
	@column('PrimaryCostValue') cost!: number

	@column('ClassJob.Abbreviation') learntBy!: string
	@column('ClassJobLevel') learntAt!: number
	@column('ClassJobCategory.Name') affinity!: string
}

export type ActionContentProps = Omit<DetailProps, 'sheet'>

export function ActionContent({
	id,
	onUpdate,
}: ActionContentProps): ReactElement {
	const data = useGameData({
		sheet: 'Action',
		columns: ActionData,
		id,
	})

	// Each time data is modified, trip update effect
	useEffect(() => onUpdate?.(), [onUpdate, data])

	const strings = useAddonStrings({ids: addonIds})

	const headerMeta = data && getHeaderMeta(data, strings)
	const meta = data && getMeta(data, strings)
	const heroMeta = data && getHeroMeta(data, strings)

	return (
		<>
			<Header
				title={data?.name ?? 'Loading'}
				subtitle={data?.category}
				icon={data?.icon && <img src={data.icon} />}
				meta={headerMeta}
			/>
			{heroMeta && <HeroMeta items={heroMeta} />}
			{data && <Description html={data.description} />}
			{meta && <Meta items={meta} />}
		</>
	)
}

const getHeaderMeta = (data: ActionData, strings: ActionAddonStrings) => [
	{name: strings.range, value: data.range == -1 ? MELEE_RANGE : data.range},
	{name: strings.radius, value: data.radius},
]

const getMeta = (data: ActionData, strings: ActionAddonStrings) => [
	{name: strings.acquired, value: `${data.learntBy} Lv. ${data.learntAt}`},
	{name: strings.affinity, value: data.affinity},
]

function getHeroMeta(data: ActionData, strings: ActionAddonStrings) {
	// TODO: Work out how to localise this stuff
	const stats: MetaItem[] = [
		{name: strings.cast, value: formatCastTime(data.castTime, strings)},
	]

	// Don't display recast if it's 0
	if (data.recastTime > 0) {
		stats.push({
			name: strings.recast,
			value: formatCastTime(data.recastTime, strings),
		})
	}

	// Only display costs if it's a known cost type - cost gets used
	// for features like gauge as well
	if (data.cost > 0 && CostType[data.costType] != null) {
		// Mana needs to be multiplied up for some dumb reason
		const value =
			data.costType === CostType.MP ? data.cost * MANA_COST_FACTOR : data.cost

		stats.push({
			name: strings[costTypeName[data.costType]],
			value,
		})
	}

	return stats
}

const formatCastTime = (time: number, strings: ActionAddonStrings) =>
	time == 0 ? strings.instant : (time * CAST_TIME_FACTOR).toFixed(2) + 's'
