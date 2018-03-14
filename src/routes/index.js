import React from 'react';
import {Router, Route,IndexRoute, hashHistory} from 'react-router'
import Ajax from 'Ajax'
import Utils from 'Utils';
import App from 'containers/root'
import Index from '../views/index';
import NoMatch from 'Coms/404';

function routes(param) {
    return (
        <Router history={hashHistory} >
            <Route path=""  component={App}  >
                <Route path="/(index)" component={Index} onEnter={()=>{Utils.setTitle('商城')}}  />
            </Route>
            <Route path="/mall"  component={App} >
                <IndexRoute component={Index} onEnter={()=>{Utils.setTitle('商城')}} onLeave={()=>{Ajax.cancelAll()}} />
                <Route path="detail/:id" getComponent={(location,cb)=>{
                    require.ensure([],(require)=>{
                        cb(null,require('../views/detail'));
                    })
                }} onEnter={()=>{Utils.setTitle('商品详情')}}  onLeave={()=>{Ajax.cancelAll()}}/>
                <Route path="order/exchangeSuccess" getComponent={(location,cb)=>{
                    require.ensure([],(require)=>{
                        cb(null,require('../views/successinfo'));
                    })
                }} onEnter={()=>{Utils.setTitle('兑换成功')}}  />
                <Route path="order/:id" getComponent={(location,cb)=>{
                    require.ensure([],(require)=>{
                        cb(null,require('../views/order'));
                    })
                }} onEnter={()=>{Utils.setTitle('提交订单')}}  onLeave={()=>{Ajax.cancelAll()}}/>
            </Route>
            <Route path="/home"  component={App} >
                <IndexRoute getComponent={(location,cb)=>{
                    require.ensure([],(require)=>{
                        cb(null,require('../views/home'));
                    })
                }} onEnter={()=>{Utils.setTitle('个人中心')}} onLeave={()=>{Ajax.cancelAll()}} />
                <Route path="address" getComponent={(location,cb)=>{
                    require.ensure([],(require)=>{
                        cb(null,require('../views/address'));
                    })
                }}  onEnter={()=>{Utils.setTitle('管理收货地址')}}   onLeave={()=>{Ajax.cancelAll()}}/>
                <Route path="address/order/:id" getComponent={(location,cb)=>{
                    require.ensure([],(require)=>{
                        cb(null,require('../views/address/order'));
                    })
                }} onEnter={()=>{Utils.setTitle('选择收货地址')}}    onLeave={()=>{Ajax.cancelAll()}}/>
                <Route path="address/edit/:id/order/:oid" getComponent={(location,cb)=>{
                    require.ensure([],(require)=>{
                        cb(null,require('../views/address/edit'));
                    })
                }} onEnter={()=>{Utils.setTitle('编辑收货地址')}}    onLeave={()=>{Ajax.cancelAll()}}/>
                <Route path="address/add/order/:oid" getComponent={(location,cb)=>{
                    require.ensure([],(require)=>{
                        cb(null,require('../views/address/add'));
                    })
                }} onEnter={()=>{Utils.setTitle('新增收货地址')}}    onLeave={()=>{Ajax.cancelAll()}}/>
                <Route path="address/add" getComponent={(location,cb)=>{
                    require.ensure([],(require)=>{
                        cb(null,require('../views/address/add'));
                    })
                }} onEnter={()=>{Utils.setTitle('新增收货地址')}}    onLeave={()=>{Ajax.cancelAll()}}/>

                <Route path="address/edit/:id" getComponent={(location,cb)=>{
                    require.ensure([],(require)=>{
                        cb(null,require('../views/address/edit'));
                    })
                }} onEnter={()=>{Utils.setTitle('编辑收货地址')}}    onLeave={()=>{Ajax.cancelAll()}}/>
                <Route path="order/my" getComponent={(location,cb)=>{
                    require.ensure([],(require)=>{
                        cb(null,require('../views/order_my'));
                    })
                }}  onEnter={()=>{Utils.setTitle('我的工单')}}  onLeave={()=>{Ajax.cancelAll()}}>
                    <IndexRoute getComponent={(location,cb)=>{
                        require.ensure([],(require)=>{
                            cb(null,require('../views/order_my/process'));
                        })
                    }} onLeave={()=>{Ajax.cancelAll()}} />
                    <Route path="process" getComponent={(location,cb)=>{
                        require.ensure([],(require)=>{
                            cb(null,require('../views/order_my/process'));
                        })
                    }}    onLeave={()=>{Ajax.cancelAll()}}/>
                    <Route path="passed" getComponent={(location,cb)=>{
                        require.ensure([],(require)=>{
                            cb(null,require('../views/order_my/passed'));
                        })
                    }}  onLeave={()=>{Ajax.cancelAll()}}/>
                    <Route path="failed" getComponent={(location,cb)=>{
                        require.ensure([],(require)=>{
                            cb(null,require('../views/order_my/failed'));
                        })
                    }}    onLeave={()=>{Ajax.cancelAll()}}/>
                </Route>

                <Route path="integralDetail" getComponent={(location,cb)=>{
                    require.ensure([],(require)=>{
                        cb(null,require('../views/integral_detail'));
                    })
                }} onEnter={()=>{Utils.setTitle('我的易币')}}  onLeave={()=>{Ajax.cancelAll()}}/>
                <Route path="transactionDetail" getComponent={(location,cb)=>{
                    require.ensure([],(require)=>{
                        cb(null,require('../views/transaction_detail'));
                    })
                }} onEnter={()=>{Utils.setTitle('我的兑换')}}  onLeave={()=>{Ajax.cancelAll()}}/>
            </Route>
            <Route path="/task"  component={App} >
                <IndexRoute getComponent={(location,cb)=>{
                    require.ensure([],(require)=>{
                        cb(null,require('../views/task'));
                    })
                }} onEnter={()=>{Utils.setTitle('任务中心')}} onLeave={()=>{Ajax.cancelAll()}} />
                <Route path="guide" getComponent={(location,cb)=>{
                    require.ensure([],(require)=>{
                        cb(null,require('../views/task_guide'));
                    })
                }} onEnter={()=>{Utils.setTitle('任务攻略')}} onLeave={()=>{Ajax.cancelAll()}} />
                <Route path="order" getComponent={(location,cb)=>{
                    require.ensure([],(require)=>{
                        cb(null,require('../views/wk_order'));
                    })
                }} onEnter={()=>{Utils.setTitle('提交工单')}} onLeave={()=>{Ajax.cancelAll()}} />
                <Route path="new_order/(:type)" getComponent={(location,cb)=>{
                    require.ensure([],(require)=>{
                        cb(null,require('../views/wk_order'));
                    })
                }} onEnter={()=>{Utils.setTitle('提交工单')}} onLeave={()=>{Ajax.cancelAll()}} />
                <Route path="order/edit/(:id)" getComponent={(location,cb)=>{
                    require.ensure([],(require)=>{
                        cb(null,require('../views/wk_order'));
                    })
                }} onEnter={()=>{Utils.setTitle('提交工单')}} onLeave={()=>{Ajax.cancelAll()}} />
                <Route path="order/view/(:id)" getComponent={(location,cb)=>{
                    require.ensure([],(require)=>{
                        cb(null,require('../views/wk_order_view'));
                    })
                }} onEnter={()=>{Utils.setTitle('查看工单')}} onLeave={()=>{Ajax.cancelAll()}} />
                <Route path="identity/(:id)" getComponent={(location,cb)=>{
                    require.ensure([],(require)=>{
                        cb(null,require('../views/identity'));
                    })
                }} onEnter={()=>{Utils.setTitle('盛天身份认证')}} onLeave={()=>{Ajax.cancelAll()}} />
                <Route path="order/submit/(:id)" getComponent={(location,cb)=>{
                    require.ensure([],(require)=>{
                        cb(null,require('../views/wk_order_submit'));
                    })
                }} onEnter={()=>{Utils.setTitle('提交工单')}} onLeave={()=>{Ajax.cancelAll()}} />
                <Route path="order/success" getComponent={(location,cb)=>{
                    require.ensure([],(require)=>{
                        cb(null,require('../views/wk_order_success'));
                    })
                }} onEnter={()=>{Utils.setTitle('提交工单成功')}} onLeave={()=>{Ajax.cancelAll()}} />
            </Route>
            <Route path="*" component={NoMatch}/>
        </Router>
      )
}
export default routes
