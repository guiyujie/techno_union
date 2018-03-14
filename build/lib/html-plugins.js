/**
 * 包含配置：
 * html-webpack-plugin及扩展插件
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');
//html文件写入插件（扩展HtmlWebpackPlugin）
//- 开发环境文件创建和变动保存在内存中，而html文件需要通过浏览器访问，此插件提供写入硬盘功能
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
//util
const util = require('./util')

module.exports = function(conf, webpack) {
    const {
        NODE_ENV,
        dllPath,
        pages
    } = conf

    let configs = Array.isArray(pages)? pages: (pages?[pages]: [])

    configs = configs.map(config => {
        const files = util.getFilesByGlob(config.template)
        const result = files.map(filepath => {
            const opt = Object.assign({}, config);
            const file = util.parsedFile(filepath);
            if(Array.isArray(opt.chunks)){
                opt.chunks = opt.chunks.map(chunk => util.parseByVars(chunk, { name: file.name }))
            }
            return new HtmlWebpackPlugin(Object.assign(opt,{
                template: filepath,
                filename: util.resolveProjectPath(
                    util.parseByVars(opt.filename, { name: file.name, hash: file.hash })
                ),
                //注入当前环境下的dll文件路径
                dllPath,
                //注入当前环境
                env: NODE_ENV,
                //始终将生成的页面写入硬盘
                alwaysWriteToDisk: true,
            }))
        })
        return result
    })

    configs = [].concat.apply([], configs)

    return [].concat(configs,[
        // 支持html-webpack-plugin写入硬盘
        new HtmlWebpackHarddiskPlugin()
    ])
};
