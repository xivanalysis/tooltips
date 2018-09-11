module.exports = {
	module: {
		rules: [{
			test: /\.module\.css$/,
			use: [{
				loader: 'style-loader',
			}, {
				loader: 'css-loader',
				options: {
					modules: true,
				},
			}],
		}],
	},
}
