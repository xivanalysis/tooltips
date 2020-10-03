import React from 'react'
import {useGameData} from './hooks'
import {Data, column} from './data'

class LabelData extends Data {
	@column('ID') id!: number
	@column('Name') name!: string
	@column('Icon') icon!: string
}

export function Label() {
	const data = useGameData({
		sheet: 'Action',
		columns: LabelData,
		id: 3569,
	})

	return data == null ? (
		<>waiting</>
	) : (
		<dl>
			{Object.entries(data).map(([key, value]) => (
				<React.Fragment key={key}>
					<dt>{key}</dt>
					<dd>{value as any}</dd>
				</React.Fragment>
			))}
		</dl>
	)
}
