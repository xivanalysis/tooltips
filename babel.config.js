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

	ignore: [/.*\.stories\.[tj]sx?/],
})
