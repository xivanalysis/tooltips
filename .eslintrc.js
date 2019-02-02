module.exports = {
	extends: [
		'plugin:xivanalysis/recommended',
		'plugin:xivanalysis/client',
	],
	settings: {
		react: {
			version: 'detect',
		},
	},
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
