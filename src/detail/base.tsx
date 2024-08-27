import React, {ReactElement, useEffect} from 'react'
import {column, Data} from '../data'
import {useGameData} from '../hooks'
import {Description} from '../ui/description'
import {Header} from '../ui/header'
import {DetailProps} from './detail'

export class BaseData extends Data {
	@column('Name') name!: string
	@column('Icon', {type: 'icon'}) icon!: string
	@column('Description@as(html)', {source: 'transient'}) description!: string
}

export function BaseContent({sheet, id, onUpdate}: DetailProps): ReactElement {
	const data = useGameData({
		sheet,
		columns: BaseData,
		id,
	})

	// Each time data is modified, trip update effect
	useEffect(() => onUpdate?.(), [onUpdate, data])

	return (
		<>
			<Header
				title={data?.name ?? 'Loading'}
				icon={data?.icon && <img src={data.icon} />}
			/>
			{data && <Description html={data.description} />}
		</>
	)
}
