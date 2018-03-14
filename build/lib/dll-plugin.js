/**
 * 包含配置：
 * webpack.DllReferencePlugin
 */
module.exports = function(conf, webpack){
	const { context, manifest } = conf
	return [
		new webpack.DllReferencePlugin({
	    	context,
	    	manifest
		})
	]
}