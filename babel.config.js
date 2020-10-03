module.exports = api => ({
	presets: [
		'@babel/preset-env',
		[
			'@babel/preset-typescript',
			{
				allowDeclareFields: true,
			},
		],
		[
			'@babel/preset-react',
			{
				development: api.env('development'),
			},
		],
	],

	ignore: [api.env('storybook') ? undefined : /.*\.stories\.[tj]sx?/].filter(
		pattern => pattern != null,
	),
})
