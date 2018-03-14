/**
 * 包含配置：
 * extract-text-webpack-plugin
 */

//提取文本（CSS）插件
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = function(conf, webpack) {
	const { filename } = conf
	return [
        //将css提取为单独文件
        new ExtractTextPlugin({
            //导出文件名，含路径
            filename,
            //向所有额外的 chunk 提取（默认只提取初始加载模块）
            allChunks: true
        })
    ]
}