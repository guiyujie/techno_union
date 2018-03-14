/**
 * 通用工具方法
 */
const path = require('path')
const glob = require('glob')

/**
 * 获取项目路径
 * @param  {[string]} filename 子路径（相对项目根目录）
 * @return {[string]}          真实路径
 */
function resolveProjectPath(filename){
	//绝对路径直接返回
	if(path.isAbsolute(filename)){
		return filename
	}
	return path.resolve(process.cwd(), `${filename || ''}`)
}

/**
 * 获取匹配到的文件
 * @param  {[type]}   pattern 匹配规则
 * @param  {[object]} options 选项
 * @return {[array]}          匹配到的文件
 */
function getFilesByGlob(pattern, options){
	return glob.sync(pattern, Object.assign({nodir: true}, options))
}

/**
 * 转译文件路径
 * @param  {[type]} filepath 文件路径
 * @return {[object]}        转译后的文件对象
 */
function parsedFile(filepath){
	return Object.assign(path.parse(filepath), { hash:'xxx' })
}

/**
 * 转译带变量的文件路径
 * @param  {[string]} filepath 文件路径
 * @param  {[object]} vars     变量对象，如{env: 'production'}
 * @return {[string]}          转译后的文件路径
 */
function parseByVars(filepath, vars){
	if(typeof filepath !== 'string'){
		return filepath + ''
	}
	Object.keys(vars).map(key => {
		filepath = filepath.replace(new RegExp(`\\[${key}\\]`, 'g'), vars[key])
	})
	return filepath
}

/**
 * 获取对象属性，常用于获取配置
 * @param  {[object]} object   对象
 * @param  {[string]} property 属性名
 * @param  {[array]}  args     若属性为方法，则此项为方法参数
 * @param  {[object]} context  若属性为方法，则此项为方法上下文（默认是该对象本身）
 * @return {[*]}               若属性为方法，则返回方法执行结果
 */
function resultWith(object, property, args, context){
	if (typeof object !== 'object') {
       return undefined;
    }
    var val = typeof property === 'string' ? object[property.trim()] : object;
    if (typeof val === 'function') {
        return val.apply(context || object, args || []);
    } else {
        return val;
    }
}

module.exports = {
	resolveProjectPath,
	getFilesByGlob,
	parsedFile,
	parseByVars,
	resultWith
}
