/**
 * 包含配置：
 * copy-webpack-plugin
 */

const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const util = require('./util')

module.exports = function(conf, webpack){
	const { copy, outputPath, dllFileName } = conf
	let configs = [{
			from: dllFileName,
			to: outputPath
	}].concat(copy || [])

	configs = configs.map(config => {
		config.from = util.resolveProjectPath(config.from)
		config.to = util.resolveProjectPath(config.to)
		return config
	})

	return [
  	new CopyWebpackPlugin(configs)
	]
}
