/**
 * 包含配置：
 * style-loader
 * css-loader
 * postcss-loader
 * less-loader
 */
const fs = require('fs')
const path = require('path')
//提取文本（CSS）插件
const ExtractTextPlugin = require("extract-text-webpack-plugin")
//util
const util = require('./util')


module.exports = function(conf, webpack) {
	const {
		NODE_ENV,
		sourceMap,
		minimize,
		cssModules,
		theme,
		autoprefixerOptions
	} = conf
	const moduleConfig = {}

	const postcssConfig = require('./postcss-loader')(conf, webpack)

	const makeCssRules = rules => {
		if(NODE_ENV === 'production'){
			rules.splice(0,1);
			return ExtractTextPlugin.extract({
	        	fallback: "style-loader",
	        	use: rules
	        })
		}
        return rules
	}

	//使用cssMdoules（默认启用）
	if (cssModules !== false) {
		const localIdentName = NODE_ENV === 'production' ? '[path][name]__[local]--[hash:base64:8]' : '[path][name]__[local]--[hash:base64:8]';
		Object.assign(moduleConfig, {
			//启用 css-modules 模式
			modules: true,
			//导出以驼峰化命名的类名
			//以连接符'-'命名的类名会被导出生驼峰式
			//如：.class-name{} => import { className } from 'style.less';
			camelCase: true,
			//local作用域生成的类名格式
			localIdentName
		})
	}
	//使用自定义主题
	//获取主题配置的less变量
	let modifyVars = theme || {}; //以js object的方式配置
	//以配置文件的方式配置
	if (typeof theme === 'string') {
		const themePath = util.resolveProjectPath(theme)
		if (path.parse(themePath).ext == '.less') {
			//从less文件读取
			modifyVars = require('less-vars-to-js')(fs.readFileSync(themePath, 'utf8')) || {};
		} else {
			//从js/json文件读取
			modifyVars = require(themePath)
		}
	}
	return [
		//vendor css + less
		{
			test: /\.(css|less)$/,
			include: /node_modules/,
			use: makeCssRules([
			{
				loader: 'style-loader'
			},
			{
				loader: 'css-loader',
				options: {
					//源码调试
					sourceMap,
					//压缩
					minimize
				}
			},
			postcssConfig,
			{
				loader: 'less-loader',
				options: {
					//源码调试
					sourceMap,
					//less变量
					modifyVars
				}
			}])
		},
        //第三方weUI问题
        {
            test: /\.less$/,
            include: /uilib/,
            use: makeCssRules([
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                    options: {
                        //源码调试
                        sourceMap,
                        //压缩
                        minimize,
                        //在 css-loader 前应用的 loader 的数？
                        importLoaders: 1
                    }

                },	postcssConfig,  {
                    loader: 'less-loader',
                }
            ])
        },
		//less + css modules
		{
			test: /\.less$/,
			// 排除引入的node_modules模块
			exclude: /node_modules|uilib/,
			use: makeCssRules([{
				loader: 'style-loader'
			}, {
				loader: 'css-loader',
				options: Object.assign({
					//源码调试
					sourceMap,
					//压缩
					minimize,
					//在 css-loader 前应用的 loader 的数？
					importLoaders: 1
				}, moduleConfig)
			},
			postcssConfig,
			{
				loader: 'less-loader',
				options: {
					sourceMap,
                    //less变量
                    modifyVars
				}
			}])
		},
		//css
		{
			test: /\.css$/,
			use: makeCssRules([{
				loader: 'style-loader'
			}, {
				loader: 'css-loader',
				options: {
					//源码调试
					sourceMap,
					//在 css-loader 前应用的 loader 的数？
					importLoaders: 1
				}
			}])
		}
	]
}
