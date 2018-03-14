import * as commonAction from 'actions/common_action'
import Ajax from 'Ajax'


//hack qs数据,处理登录跳转
var qs = location.search;

    export default {
    //请求出错时返回Promise reject
    returnRejectedPromiseOnError: true,
    //拦截器
    interceptors: {
        request: [{
            //处理成功请求
            success: ({
                getState,
                dispatch,
                getSourceAction
            }, config) => {
                //在每次请求前添加cancelKey,cancel请求
                config.reqId = new Date().getTime();
                config.cancelToken = Ajax.addRequest(config.reqId);
                dispatch(commonAction.optLoading('正在操作'));
                //如果是jsonp，则设置适配器来处理请求
                if(config.jsonp){
                    config.adapter = config => {
                        return Ajax.jsonp(config)
                    }
                }
                return config
            },
            //处理失败请求
            error: ({
                getState,
                dispatch,
                getSourceAction
            }, error) => {
                return Promise.reject(error);
            }
        }],
        response: [{
            //处理成功返回
            success: ({
                getState,
                dispatch,
                getSourceAction
            }, res) => {
                //请求完成,移除cencel栈
                Ajax.removeRequest(res.config.reqId);
                const source = getSourceAction(res.config);
                const data = res.data;


                //判断服务端返回状态是否正确
                const isSuccess = data && data.status == 'success';
                const msg = data && data.info;

                //判断登录失效,拦截跳转
                if(data.status=='error' && (data.info=="用户未登录" || data.info=="登录过期") && qs){
                    location.href = location.href + qs;
                    return res;
                }

                if (isSuccess) {
                    dispatch(commonAction.optSuccess(msg))
                } else {
                    dispatch(commonAction.optError(msg))
                }
                return res
            },
            //处理失败返回
            error: ({
                getState,
                dispatch,
                getSourceAction
            }, error) => {
                //取消操作错误不发出
                if (Ajax.axios.isCancel(error)) {
                    console.log('Request canceled',error.message);
                    //return Promise.reject(error);
                }else{
                    dispatch(commonAction.optError('网络异常'));
                    return Promise.reject(error);
                }
            }
        }]
    }
};
