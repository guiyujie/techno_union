const path = require('path')
//webpack
const webpack = require('webpack')
//webpack配置合并插件
const webpackMerge = require('webpack-merge')
//导入webpack公共配置
const commonConfig = require('./webpack.config.common.js')
//util
const util = require('./lib/util')

module.exports = function( NODE_ENV, conf ) {
    //判断是否preview环境
    const isDebug = NODE_ENV === 'preview'? !!(NODE_ENV = 'production'): false
    //读取publicPath
    const publicPath = conf.publicPath || '/';
    //读取dll manifest
    const dllManifest = require(
        util.resolveProjectPath(
            util.parseByVars(conf.dll.manifest, { env: NODE_ENV })
        )
    );
    const dllPath = publicPath + conf.resourcePath.js + dllManifest.name + '.js';
    //在资源映射表中注入额外的资源信息
    const injectAssets = {
        'vendor':{
            'js': dllPath
        }
    };

    return webpackMerge(
        commonConfig(NODE_ENV, conf),
        isDebug?{
            //预览服务器配置
            devServer: require('./lib/dev-server')({
                NODE_ENV,
                isDebug,
                mock: conf.mock,
                proxy: conf.proxy,
                devServer: conf.devServer,
                publicPath,
                outputPath: conf.outputPath,
                dll: conf.dll
            }, webpack),
        }:{},
        {

            //sourcemap类型
            devtool: conf.sourceMap? 'source-map':'',
            //输出
            output: {
                // 所有输出文件的目标路径
                // 必须是绝对路径（使用 Node.js 的 path 模块）
                path: util.resolveProjectPath(conf.outputPath),
                filename: conf.resourcePath.js+'[name]_[chunkhash:8].js',
                //注,此处是设置html的资源前缀路径
                publicPath: conf.publicPath
            },

            //使用common配置
            // modules: {},
            //使用common配置
            // resolve: {},

            //插件
            plugins: [].concat(

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
                    filename: conf.resourcePath.css + '[name]_[contenthash:8].css'
                }, webpack),

                require('./lib/optimize-plugins')({
                    NODE_ENV,
                    sourceMap: conf.sourceMap
                }, webpack),

                require('./lib/assets-plugin')({
                    NODE_ENV,
                    manifest: conf.manifest,
                    injectAssets
                }, webpack),

                require('./lib/copy-plugin')({
                    NODE_ENV,
                    copy: conf.copy,
                    outputPath: conf.outputPath + "/" + conf.resourcePath.js,
                    dllFileName: path.join(conf.dll.path, dllManifest.name + '.js')
                }, webpack)
            )
        })
}
