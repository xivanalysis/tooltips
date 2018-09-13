import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'

import packageJson from './package.json'

export default {
	input: 'src/index.js',
	output: [{
		file: packageJson.main,
		format: 'cjs',
	}, {
		file: packageJson.module,
		format: 'es',
	}],
	plugins: [
		external(),
		postcss({
			modules: true,
			extract: true,
		}),
		json(),
		babel(),
		resolve({
			preferBuiltins: false,
		}),
		commonjs(),
	],
}
