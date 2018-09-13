import {storiesOf} from '@storybook/react'
import {text, number} from '@storybook/addon-knobs'
import React from 'react'

import Provider from 'Provider'
import Tooltip from 'Tooltip'

storiesOf('Custom', module)
	.add('Tooltip', () => <Provider language={text('Language')}>
		<Tooltip
			type={text('Type')}
			id={number('ID')}
		/>
	</Provider>)

storiesOf('Action', module)
	.add('Weaponskill', () => <Tooltip type="Action" id={42}/>)
	.add('Spell', () => <Tooltip type="Action" id={3579} />)
	.add('Ability', () => <Tooltip type="Action" id={7562} />)
	.add('LimitBreak', () => <Tooltip type="Action" id={4246} />)

storiesOf('Status', module)
	.add('Status', () => <Tooltip type="Status" id="44"/>)
