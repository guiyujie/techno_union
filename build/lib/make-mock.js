const fs = require('fs.extra')
const path = require('path')
const chalk = require('chalk');
const chokidar = require('chokidar')
const proxy = require('express-http-proxy');
const {parse:urlParser, format:urlFormat} = require('url');

//解析名值对配置
function parseKeyValue(key, value) {
    let method = 'all',
        url = key
    if (/\s/.test(key)) {
        const arr = key.split(' ')
        method = arr[0].toLowerCase()
        url = arr[1]
    }
    return {
        method,
        url
    }
}

//将文件名解析成url形式
//- 支持指定后缀
//- $	 匹配任意字符
//- $d 匹配数字
//- $u 匹配下划线
function parseUrl(name, ext) {

    return '/' + name
        //去掉后缀
        .replace(/\.[A-Za-z]+$/, '')
        //匹配数字
        .replace(/\$d/g, '\\d+')
        // _ 替换成 /
        .replace(/_/g, '/')
        //匹配下划线
        .replace(/\$u/g, '_')
        // $ 替换成 *
        .replace(/\$/, '*') + ext
}

//创建一个Mock处理器
function makeMock(value) {
    return function mockHandler(...args) {
        const res = args[1];
        if (typeof value === 'function') {
            value(...args);
        } else {
            res.json(value);
        }
    };
}

//创建一个Proxy处理器
function makeProxy(target, url, method) {
    const {protocol, host, port, pathname, query} = urlParser(target, true)
    return proxy(target, {
        filter(req) {
            return method && method !== 'all' ? req.method.toLowerCase() === method.toLowerCase() : true;
        },
        proxyReqPathResolver: function(req) {
            const parsedUrl = urlParser(req.url, true)
            const url = urlFormat({
                protocol,
                host,
                port,
                pathname,
                query: Object.assign({}, query, parsedUrl.query)
            }) 
            console.log(chalk.bold.yellow('mock:'), 'proxy from ', chalk.bold.blue(parsedUrl.path), 'to', chalk.bold.blue(url))
            return url
        }
    });
}

//创建一个处理器
function makeHandler(app, {value, url, method}){
    //value为字符串，则认为是Proxy
    if (typeof value === 'string') {
        res = makeProxy(value, url, method)
    }else{
        res = makeMock(value)
    }
    makeRouter(app, {
        res,
        url,
        method
    })
}


//创建一个express路由
function makeRouter(app, {
    method,
    url,
    res
}) {
    (app[method] || app.all).call(app, url, res)
}
//获取路由堆栈
function getRouteStack(app) {
    return app._router.stack
}

//初始化
function setup(app, conf, index) {
    const {
        mockPath,
        apiExt
    } = conf;
    const files = fs.readdirSync(mockPath);

    if (files) {
        let mockLength = 0;
        const stackLength = getRouteStack(app).length;
        files.forEach(fileName => {
            const filePath = path.join(mockPath, fileName);
            delete require.cache[filePath];
            const config = require(filePath);
            let url = parseUrl(fileName, apiExt);
            let method = 'all';
            let res = null;

            if (/\.js$/.test(fileName)) { //js文件
                //支持一个文件中多mock配置
                if (typeof config === 'object') {
                    Object.keys(config).forEach((key) => {
                        const value = config[key]
                        const {
                            url,
                            method
                        } = parseKeyValue(key, value)
                        makeHandler(app, {value, url, method})
                        mockLength++
                    })
                } else {
                    makeHandler(app, {value: config, url, method})
                    mockLength++
                }
                return true;
            }

            if (/\.json$/.test(fileName)) { //json文件
                makeHandler(app, {value: config, url, method})
                mockLength++
            }
        })

        console.log(chalk.bold.yellow('mock:'), chalk.bold.green(mockLength), 'new mock data created!')

        //调整顺序
        // console.log('stackLength',stackLength+' => '+ getRouteStack(app).length)
        if (index != undefined) {
            //删除原栈中的mocklist
            const mockStack = getRouteStack(app).splice(stackLength, mockLength);
            //插入到初始化索引处
            getRouteStack(app).splice(index, 0, ...mockStack);
        } else {
            index = stackLength
        }
        //监听mock文件变化
        const watcher = chokidar.watch(mockPath, {
            ignored: /node_modules/,
            persistent: true,
        });
        watcher.on('change', (path) => {
            console.log(chalk.bold.yellow('mock:'), path.replace(mockPath, '.'), chalk.bold.green('[changed]'));
            console.log(chalk.bold.yellow('mock:'), 'reseting...')
            watcher.close();
            //删除旧的mocklist
            getRouteStack(app).splice(index, mockLength);
            setup(app, conf, index);
        });
    }
}

module.exports = function(app, conf = {}) {

    console.log('\n')
    console.log(chalk.bold.yellow('mock:'), 'starting...')
    setup(
        app,
        Object.assign({
            mockPath: path.resolve(__dirname, `../mock`),
            apiExt: ''
        }, conf)
    )
}