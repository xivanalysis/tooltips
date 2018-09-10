import {storiesOf} from '@storybook/react'
import React from 'react'

import Provider from 'Provider'
import Tooltip from 'Tooltip'

storiesOf('Tooltip', module)
	.addDecorator(story => <Provider>{story()}</Provider>)
	.add('Tooltip', () => <Tooltip/>)
