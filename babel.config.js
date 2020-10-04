const getPlugins = isTSX => [
	'@compiled/babel-plugin-css-in-js',
	['@babel/plugin-transform-typescript', {
		isTSX,
		allowDeclareFields: true,
	}],
	['@babel/plugin-proposal-decorators', {
		decoratorsBeforeExport: true,
	}],
	'@babel/plugin-proposal-class-properties',
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
