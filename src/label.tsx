import React from 'react'
import {useGameData} from './hooks'
import {Data, column} from './data'

export class ActionLabelData extends Data {
	static sheet = 'Action'

	@column('ID') id!: number
	@column('Name') name!: string
	@column('Icon') icon!: string
}

export function Label() {
	const data = useGameData({
		sheet: ActionLabelData,
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
