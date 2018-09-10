module.exports = {
	extends: [
		'plugin:xivanalysis/recommended',
	],
	env: {
		browser: true,
	},
	overrides: [{
		files: ['stories/*.stories.js'],
		globals: {
			module: true,
		}
	}]
}
