/* eslint-env node */

const {
	configure
} = require('quasar/wrappers')

module.exports = configure(function (ctx) {
	return {
		supportTS: false,
		boot: [
			'process-es6.js'
		],
		css: [
			'app.scss'
		],
		extras: [
			'roboto-font',
			'material-icons'
		],
		build: {
			vueRouterMode: 'hash',
			extendWebpack(cfg) {
				cfg.resolve.fallback = {
					fs: false,
					crypto: false,
					Buffer: false,
					os: false,
					path: false,
					stream: false,
					assert: false,
					dns: false,
					net: false,
					tls: false,
					http2: false,
					https: false,
					http: false,
					zlib: false
				}
			}
		},
		devServer: {
			server: {
				type: 'http'
			},
			port: 8080,
			open: true
		},
		electron: {
			bundler: 'packager',
			packager: {
			},
			builder: {
				appId: 'terra-dap'
			}
		}
	}
})
