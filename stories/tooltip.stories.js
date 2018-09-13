import {storiesOf} from '@storybook/react'
import {text, number} from '@storybook/addon-knobs'
import React from 'react'

import Tooltip from 'Tooltip'

storiesOf('Custom', module)
	.add('Custom', () => <Tooltip
		type={text('Type')}
		id={number('ID')}
	/>)

storiesOf('Action', module)
	.add('Weaponskill', () => <Tooltip type="Action" id={42}/>)
	.add('Spell', () => <Tooltip type="Action" id={3579} />)
	.add('Ability', () => <Tooltip type="Action" id={7562} />)
	.add('LimitBreak', () => <Tooltip type="Action" id={4246} />)
