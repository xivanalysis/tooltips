import {addDecorator, configure} from '@storybook/react'
import {withKnobs} from '@storybook/addon-knobs'

addDecorator(withKnobs)

// Pull in all .stories.js files
const req = require.context('../stories', true, /.stories.js$/)
configure(() => {
	req.keys().forEach(filename => req(filename))
}, module)
