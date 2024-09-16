const MODE = require('./src/config.json').MODE

module.exports = {
	devServer: {
		allowedHosts: 'all'
	},
	outputDir: 'dist-' + MODE,
}
