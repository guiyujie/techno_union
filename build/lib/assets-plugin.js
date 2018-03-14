/**
 * 包含配置：
 * assets-webpack-plugin
 */
const AssetsPlugin = require('assets-webpack-plugin');
const util = require('./util');
//资源映射表
module.exports = function(conf, webpack) {
    const { manifest, injectAssets } = conf;
    let plugins=[],confs=manifest;
    if(!Array.isArray(manifest)){
        confs = [confs];
    }

    confs.map(function(item,i){
        plugins.push(new AssetsPlugin({
            path: util.resolveProjectPath(item.path),
            filename: util.resultWith(item, 'filename'),
            processOutput: function(assets) {
                //注入的资源信息
                return JSON.stringify(Object.assign(assets, injectAssets));
            }
        }))
    });

    return plugins;
};
