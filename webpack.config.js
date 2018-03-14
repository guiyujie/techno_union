/**
 * wepack配置桥接文件
 * @param  {string|object} 			env webpack命令行参数（https://doc.webpack-china.org/configuration/configuration-types/#-env-）
 * @return {object|function}        webpack配置
 */
module.exports = function(env) {
    //读取构建配置
    const conf = require('./build.config')(env);
    //定义环境变量（优先node环境变量）
    let NODE_ENV = process.env.NODE_ENV;
    //判断环境变量，调用dll配置文件
    if(typeof env === 'object' && env.dll){
        return require('./build/webpack.dll.config.js')(NODE_ENV || env.NODE_ENV , conf)
    }
    NODE_ENV = NODE_ENV || env
    //判断环境变量，调用不同配置文件
    return NODE_ENV === 'production' || NODE_ENV === 'preview' ?
        require('./build/webpack.config.prod.js')(NODE_ENV, conf) :
        require('./build/webpack.config.dev.js')(NODE_ENV, conf)
}
