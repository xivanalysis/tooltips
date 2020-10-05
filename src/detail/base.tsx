import React, {ReactElement, useContext} from 'react'
import {Context} from '../context'
import {column, Data} from '../data'
import {useGameData} from '../hooks'
import {Description} from '../ui/description'
import {Header} from '../ui/header'

export class BaseData extends Data {
	@column('Name') name!: string
	@column('Icon') icon!: string
	@column('Description') description!: string
}

export interface BaseContentProps {
	sheet: string
	id: number
}

export function BaseContent({sheet, id}: BaseContentProps): ReactElement {
	const {baseUrl} = useContext(Context)
	const data = useGameData({
		sheet,
		columns: BaseData,
		id,
	})

	return (
		<>
			<Header
				title={data?.name ?? 'Loading'}
				icon={data?.icon && baseUrl + data.icon}
			/>
			{data && <Description html={data.description} />}
		</>
	)
}
