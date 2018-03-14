/**
 * 包含配置：
 * webpack-dev-server
 */
const express = require('express'); //express
const makeMock = require('./mock'); //mock服务

module.exports = function(conf, webpack) {
	const {
		isDebug,
		devServer,
		mock,
		proxy,
		publicPath,
		outputPath,
		dll
	} = conf
	const contentBase = [dll.path].concat(devServer.contentBase || [])
	const defaults = {
		//信息显示配置
		stats: "normal",
		//是否显示全屏遮罩
		overlay: true,
		//watch配置
		watchOptions: {
			ignored: /node_modules/
		},
		//开启浏览器历史
		historyApiFallback: true,
		//修复`--host 0.0.0.0`时报错：`invalid host header`
		//参考：https://segmentfault.com/a/1190000009425403
		disableHostCheck: true
	};
	return Object.assign(defaults, devServer, {
		contentBase,
		//调试模式，开启数据代理
		//开发模式，开启devServer.proxy配置的代理
		proxy: isDebug ? proxy : (devServer.proxy || {}),
		//扩展devServer
		setup(app) {
			//将outputPath下的静态资源托管到publicPath路径下
			//参考：http://www.expressjs.com.cn/starter/static-files.html
			app.use(publicPath, express.static(outputPath))
			//非联调模式，使用mock数据
			!isDebug && makeMock(app, mock)
            console.log("mock");
			//若用户配置了setup选项，则追加到后面执行
			if (devServer.setup && typeof devServer.setup === 'function') {
				devServer.setup(app)
			}
		}
	})
}
