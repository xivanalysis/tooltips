/* global module */

const getPlugins = isTSX => [
	'@compiled/babel-plugin',
	['@babel/plugin-transform-typescript', {
		isTSX,
		allowDeclareFields: true,
	}],
	['@babel/plugin-proposal-decorators', {
		// decoratorsBeforeExport: true,
		legacy: true,
	}],
	['@babel/plugin-proposal-class-properties', {
		loose: true,
	}],
	['@babel/plugin-transform-private-property-in-object', {loose: true}],
	['@babel/plugin-transform-private-methods', {loose: true}],
	'@babel/plugin-transform-runtime',
]

module.exports = api => ({
	presets: [
		'@babel/preset-env',
		['@babel/preset-react', {
			development: api.env('development'),
		}],
	],

	overrides: [
		{
			test: /\.ts$/,
			plugins: getPlugins(false),
		},
		{
			test: /\.tsx$/,
			plugins: getPlugins(true),
		},
	],

	ignore: [api.env('storybook') ? undefined : /.*\.stories\.[tj]sx?/].filter(
		pattern => pattern != null,
	),
})
