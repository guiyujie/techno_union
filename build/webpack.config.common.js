//webpack
const webpack = require('webpack');
// 抽取webpack中的公共配置

// entry、module 和 resolve 在开发和生产环境中的配置差异性相对较小，非常适合抽取到公共配置中
// output 和 plugins 相对来说开发和生产环境有不同的配置，因此放到dev和prod各自配置中
// devServer 仅出现在开发环境的配置直接放入dev配置中

module.exports = function( NODE_ENV, conf ){

	//是否开启source map
	const sourceMap = NODE_ENV === 'development' || conf.sourceMap;
	//仅生产环境开启压缩
	const minimize = NODE_ENV === 'development';


	return {
        //react使用外部扩展
        externals : {
            "react": 'React',
            "react-dom":'ReactDOM'
        },
		//入口
		entry: require('./lib/entries')({
			NODE_ENV,
			entries: conf.entries,
			cwd: ''
		}),
		//模块
		module: {
			rules: [].concat(
				//babel
				require('./lib/babel-loader')({
					NODE_ENV,
					sourceMap,
					minimize
				}, webpack),
				//样式
				require('./lib/css-loaders')({
					NODE_ENV,
					sourceMap,
					minimize,
					theme: conf.theme,
					cssModules: conf.cssModules,
					autoprefixerOptions: conf.autoprefixer
				}, webpack),
				//静态资源
				require('./lib/media-loaders')({
					NODE_ENV,
					minimize,
                    outpath:conf.resourcePath.images
				}, webpack)
			)
		},
		// 解析模块请求的选项
		resolve: require('./lib/resolver')({
			NODE_ENV,
			basePath: conf.basePath,
			alias: conf.alias
		}, webpack)
	}
}
