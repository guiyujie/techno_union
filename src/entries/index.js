import 'babel-polyfill'; //babel垫片，用于支持ES6 Promise，Object.assign等新特性
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router,hashHistory} from 'react-router';
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
import configureStore from '../store'
import configureRoutes from '../routes'

//获取服务端输出的数据（包含服务端预处理的数据以及reducers里初始化的数据）
const store = configureStore(window.REDUX_STATE, { routing: routerReducer});

//同步history到store
const history = syncHistoryWithStore(hashHistory, store);

//配置路由
const routes = configureRoutes(store.getState());


//引入样式依赖
import '../uilib/weui';

//渲染根节点
render(
    <Provider store={store}>
        <Router history={history} routes={routes}>

        </Router>
    </Provider>,
    document.getElementById('root')
);
