const webpack = require('webpack');
const util = require('./lib/util');

module.exports = function(NODE_ENV, conf) {
  //环境变量判断
  NODE_ENV = NODE_ENV === 'debug'?(NODE_ENV = 'development'):NODE_ENV
  NODE_ENV = NODE_ENV === 'preview'?(NODE_ENV = 'production'):NODE_ENV
  //是否生产环境
  const isProd = NODE_ENV === 'production';
  //文件名（不带后缀）
  const name = `[name]${isProd?"_[chunkhash:8]":""}`;
  //输出文件路径
  const filePath = util.resolveProjectPath(conf.dll.path);
  //输出manifest路径
  const manifest = util.resolveProjectPath(
      util.parseByVars(conf.dll.manifest, { env: NODE_ENV })
  );
  //sourcemap配置
  const devtool = !conf.sourceMap ? '' : 'source-map';
  //插件
  let plugins = [
      new webpack.DllPlugin({
        //解析包路径的上下文，这个要跟接下来配置的 webpack.config.js 一致。
        context: __dirname,
        //manifest.json文件的输出路径，这个文件会用于后续的业务代码打包
        path: manifest,
        //dll暴露的对象名，要跟output.library保持一致
        name: name
      })
    ];
  //生产环境使用压缩版
  if (isProd) {
    plugins = plugins.concat(
      //变量定义
      require('./lib/define-plugin')({
          NODE_ENV
      }, webpack),
      // js压缩配置
      require('./lib/optimize-plugins')({
          NODE_ENV,
          sourceMap: conf.sourceMap
      }, webpack)
    )
  }
  return {
      //react使用外部扩展
      externals : {
          "react": 'React',
          "react-dom":'ReactDOM'
      },
    entry: conf.dll.entry,
    output: {
      path: filePath,
      filename: name + '.js',
      //需要与filename保持一致，用于页面引用
      library: name
    },
    devtool,
    plugins
  }
};
