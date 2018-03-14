/**
 * 包含配置：
 * webpackConfig.resolve
 */
module.exports = function(conf, webpack) {
	const { basePath, alias } = conf
	return {
		// 使用的扩展名
		extensions: [".json", ".js", ".jsx", ".es", ".es6", ".css", ".less"],
		// 用于查找模块的目录
		modules: [
			"node_modules",
			basePath
		],
		// 模块别名列表
		alias
	}
}