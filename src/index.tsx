import {Data, column} from './data'
import {Detail, DetailProps} from './detail'
import {useGameData} from './hooks'
import {Label, LabelProps} from './label'
import {Provider, ProviderProps} from './provider'
import {Tooltip, TooltipProps} from './tooltip'

export {
	column,
	Data,
	Detail as TooltipDetail,
	Label as TooltipLabel,
	Provider as TooltipProvider,
	Tooltip,
	useGameData,
}
export type {
	DetailProps as TooltipDetailProps,
	LabelProps as TooltipLabelProps,
	ProviderProps as TooltipProviderProps,
	TooltipProps,
}
