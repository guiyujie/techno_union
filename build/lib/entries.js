/**
 * 包含配置：
 * webpackConfig.entry
 */

const path = require('path')
const util = require('./util')


function parseEntries(values) {
	if (typeof values === 'string') {
		return util.getFilesByGlob(values)
	}
	if (Array.isArray(values)) {
		const files = values.map(value => util.getFilesByGlob(value))
		return [].concat.apply([], files)
	}
}


function makeEntries(cwd, entries) {
	if (typeof entries === 'object') {
		return entries
	}
	const files = util.getFilesByGlob(entries, {
		cwd
	})
	const obj = {}

	files && files.forEach(filepath => {
		const file = path.parse(filepath)
		// const key = file.dir.replace(/[\/\\]/g, '_') + '_' + file.name;
		const key = file.name
		obj[key] = path.resolve(cwd, filepath)
	})

	return obj
}

module.exports = function(conf, webpack) {

	return makeEntries(util.resolveProjectPath(conf.cwd), conf.entries)
}