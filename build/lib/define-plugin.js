/**
 * 包含配置：
 * webpack.DefinePlugin
 */
//变量定义
module.exports = function(conf, webpack) {
	const { NODE_ENV} = conf
	return [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
		})
	]
}