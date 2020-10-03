import React from 'react'
import {useGameData} from './hooks'

interface ActionLabelData {
	ID: number
	Name: string
	Icon: string
}

export function Label() {
	const data = useGameData<ActionLabelData>({
		sheet: 'Action',
		id: 3569,
		columns: ['ID', 'Name', 'Icon'],
	})
	return data == null ? (
		<>waiting</>
	) : (
		<dl>
			{Object.entries(data).map(([key, value]) => (
				<>
					<dt>{key}</dt>
					<dd>{value}</dd>
				</>
			))}
		</dl>
	)
}
