/**
 * 包含配置：
 * webpack.optimize
 */
module.exports = function(conf, webpack){
	const {sourceMap} = conf
	return [
		// js压缩配置
        new webpack.optimize.UglifyJsPlugin({
        	sourceMap,
        	compress: {
	            //不输出警告
	            warnings: false
	        },
	        //不输出注释
	        comments: false
        })
	]
}