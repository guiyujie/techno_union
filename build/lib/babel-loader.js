/**
 * 包含配置：
 * babel-loader
 */
module.exports = function(conf, webpack) {
	const presets = ['es2015', 'stage-0', 'react']
	const {NODE_ENV, sourceMap} = conf

	//仅开发环境使用react热重启
	if(NODE_ENV === 'development'){
		presets.push('react-hmre')
	}
	
	return {
		test: /\.(js|jsx)$/,
		// 排除引入的node_modules模块
		exclude: /node_modules/,
		loader: 'babel-loader',
		options: {
			sourceMap,
			presets,
			plugins: [
				'transform-runtime',
				'add-module-exports',
				//antd
		        ["import", {
		            libraryName: "antd",
		            //使用定制主题功能，请务必设置style: true
		            style: true
		        }]
			]
		}
	}
}