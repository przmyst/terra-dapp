module.exports = {
	root: true,

	parserOptions: {
		parser: 'babel-eslint',
		ecmaVersion: 2018,
		sourceType: 'module'
	},

	env: {
		browser: true
	},

	extends: [

	],

	plugins: [
	],

	globals: {
		ga: true,
		cordova: true,
		__statics: true,
		__QUASAR_SSR__: true,
		__QUASAR_SSR_SERVER__: true,
		__QUASAR_SSR_CLIENT__: true,
		__QUASAR_SSR_PWA__: true,
		process: true,
		Capacitor: true,
		chrome: true
	},

	rules: {
		'quote-props': [
			'error',
			'as-needed'
		],
		semi: [
			'error',
			'never'
		],
		quotes: [
			'error',
			'single'
		],
		indent: [
			'error',
			'tab'
		],
		'array-element-newline': ['error', {
			ArrayExpression: 'consistent',
			ArrayPattern: {
				minItems: 6
			}
		}],
		'object-property-newline': ['error', {
			allowAllPropertiesOnSameLine: false
		}],
		'no-multiple-empty-lines': ['error', {
			max: 1,
			maxEOF: 1
		}],
		'object-curly-newline': ['error', 'always'],
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
	}
}
