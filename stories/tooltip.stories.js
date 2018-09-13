import {storiesOf} from '@storybook/react'
import React from 'react'

import Provider from 'Provider'
import Tooltip from 'Tooltip'

storiesOf('Tooltip', module)
	.addDecorator(story => <Provider>{story()}</Provider>)
	.add('Weaponskill', () => <Tooltip type="Action" id={42}/>)
	.add('Ability', () => <Tooltip type="Action" id={7562}/>)
	.add('Spell', () => <Tooltip type="Action" id={3579}/>)
