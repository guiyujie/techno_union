const path = require('path');
//webpack
const webpack = require('webpack');
//webpack配置合并插件
const webpackMerge = require('webpack-merge');
//导入webpack公共配置
const commonConfig = require('./webpack.config.common.js');
//util
const util = require('./lib/util');

module.exports = function( NODE_ENV, conf) {
    //判断是否debug环境
    const isDebug = NODE_ENV === 'debug'? !!(NODE_ENV = 'development'): false;
    //开发环境为根路径
    const publicPath = '/';
    //读取dll manifest
    const dllManifest = require(
        util.resolveProjectPath(
            util.parseByVars(conf.dll.manifest, { env: NODE_ENV })
        )
    );
    const dllPath = publicPath + dllManifest.name + '.js';


    return webpackMerge(
        commonConfig(NODE_ENV, conf),
        {
            //sourcemap类型
            devtool: 'cheap-module-eval-source-map',
            //开发服务器配置
            devServer: require('./lib/dev-server')({
                NODE_ENV,
                isDebug,
                mock: conf.mock,
                proxy: conf.proxy,
                devServer: conf.devServer,
                publicPath:publicPath,
                outputPath: conf.outputPath,
                dll: conf.dll
            }, webpack),
            //输出
            output: {
                // 所有输出文件的目标路径
                // 必须是绝对路径（使用 Node.js 的 path 模块）
                path: util.resolveProjectPath(conf.outputPath),
                filename: '[name].js',
                chunkFilename: 'chunk.[name].js',
                publicPath:publicPath,
            },

            //使用common配置
            // modules: {},
            //使用common配置
            // resolve: {},

            //插件
            plugins: [
                // 跳过错误信息
                new webpack.NoEmitOnErrorsPlugin(),
                // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
                new webpack.NamedModulesPlugin()
            ].concat(
                require('./lib/define-plugin')({
                    NODE_ENV
                }, webpack),

                require('./lib/dll-plugin')({
                    NODE_ENV,
                    manifest: dllManifest,
                    context: __dirname
                }, webpack),

                require('./lib/html-plugins')({
                    NODE_ENV,
                    pages: conf.pages,
                    dllPath
                }, webpack),

                require('./lib/extract-text-plugin')({
                    NODE_ENV,
                    filename: '[name].css'
                }, webpack)
            )
        })
}
