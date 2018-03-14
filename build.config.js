
/**
 * 构建工具配置
 * - 抽象了项目中最常定制的部分，能满足大部分的需求
 * - 深度定制请移步`build`目录
 */
module.exports = function(env) {
    //定义环境变量（优先node环境变量）
    const root = env === 'production'?"dist":"dev";

    return {
        //入口及承载页
        //-----------------------------------
        //入口配置，支持glob语法（参考：https://github.com/isaacs/node-glob）
        entries: 'src/entries/*.js',
        //页面配置，支持多页面
        //参考：https://github.com/jantimon/html-webpack-plugin#configuration
        pages: [{
            //标题
            title: '用户中心游戏币',
            //html模板（扩展glob语法，原插件不支持）
            template: 'src/pages/*.ejs',
            //输出文件名（扩展变量配置，原插件不支持）
            //- [name] 匹配到的模板文件名
            filename: `${root}/pages/[name].html`,
            //需要包含的模块（扩展变量配置，原插件不支持）
            //- [name] 与模板同名的entry
            chunks: ['[name]']
        }],
        //-----------------------------------


        //模块配置
        //-----------------------------------
        //模块根路径
        basePath: 'src',
        //模块别名，相对于 basePath 路径配置
        //- 推荐以大写字母开头，以区分非别名
        //- 参考：https://doc.webpack-china.org/configuration/resolve/#resolve-alias
        alias: {
            "Coms": "components",
            "Mods": "views/mods",
            "Lang": "utils/lang.js",
            "Actions":"actions",
            "ActionTypes$": "utils/action_types.js",
            "Utils$":"utils/util.js",
            "Api$": "utils/api.js",
            "Helper$": "utils/helper.js",
            "Ajax$": "utils/ajax.js"
        },
        //dll配置
        dll: {
            //打包入口
            entry:{
                'vendor': Object.keys(require('./package.json').dependencies)
            },
            //生成路径
            path: 'src/static/vendor',
            //资源映射
            //- [env] 当前环境变量
            manifest: 'src/static/vendor/manifest.[env].json'
        },
        //-----------------------------------


        //主题配置（不支持watch）
        //----------------------------------
        //通过less文件配置（推荐）
        theme: 'src/config/theme/red.less',
        //通过json文件配置
        //theme: 'src/config/theme/red.json',
        //通过js文件配置
        //theme: 'src/config/theme/red.js',
        //通过js对象配置
        //theme:{"@primary-color": "#f00"},
        //----------------------------------


        //css配置
        //----------------------------------
        //是否开启css modules（默认开启，cssModules: false 禁用）
        cssModules: true,
        //自动添加浏览器前缀
        //参考：https://github.com/postcss/autoprefixer
        autoprefixer:{
            browsers: [
                'last 2 versions',
                'iOS >= 7',
                "Android >= 4",
                'ie >= 8'
            ]
        },
        //----------------------------------


        //开发环境配置
        //----------------------------------
        //开发服务器
        //参考：https://doc.webpack-china.org/configuration/dev-server/
        devServer: {
            //静态资源目录，下面的所有资源均可通过根路径直接访问
            contentBase: ['src',`${root}/pages`,'mock']
            //数据代理（仅在dev模式下生效）
            // ,proxy: {}
        },
        //数据代理（在debug或preview模式下生效）
        //参考：https://github.com/chimurai/http-proxy-middleware#options
        proxy: {
            "/api": {
                target: "http://techno-union-dev.stnts.com",
                changeOrigin: true
            },
        },
        //mock数据（仅在dev模式下生效）
        //参考 README.md
        mock: {
            //mock目录
            mockPath: 'mock',
            //支持设置统一接口后缀，如：.do
            apiExt: '.do'
        },
        //----------------------------------


        //生产环境配置
        //----------------------------------
        //导出路径（仅生产环境）
        outputPath: `${root}/resource`,
        //前端资源路径，可以为域名url（仅生产环境）
        publicPath: '/Public/resource/',
        //和publicPath结合使用 （仅生产环境）
        resourcePath:{
            //js路径
            js:"js/",
            //css路径
            css:"css/",
            //图片路径
            images:"images/",
        },
        //是否生成sourceMap（仅生产环境）
        //开启此项会为压缩文件生成对应的*.map文件
        sourceMap: false,
        //资源映射表（仅生产环境）
        //资源映射表（仅生产环境）
        manifest: [{
            //导出资源映射表路径
            path: `${root}/manifest`,
            //资源映射表名称，如下配置将根据当前日期生成对应的资源映射表
            filename: function() {
                return `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}.json`
            }
        },{
            //导出资源映射表路径
            path: `${root}/manifest`,
            //资源映射表名称，最新的,覆盖式更新, 主要用于测试阶段
            filename: `latest.json`,
        }],
        //需要拷贝的文件（仅生产环境）
        //参考：https://github.com/kevlened/copy-webpack-plugin
        copy: [
            {
                from: 'src/static',
                to: `${root}/resource/static`
            }
        ]
        //----------------------------------
    }
};
