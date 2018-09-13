import {addDecorator, configure} from '@storybook/react'
import {withKnobs} from '@storybook/addon-knobs'
import React from 'react'

import Provider from 'Provider'

addDecorator(withKnobs)
addDecorator(story => <Provider>{story()}</Provider>)

// Pull in all .stories.js files
const req = require.context('../stories', true, /.stories.js$/)
configure(() => {
	req.keys().forEach(filename => req(filename))
}, module)
