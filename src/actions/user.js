import ActionTypes from 'ActionTypes';
import Api from 'Api';
import Utils from 'Utils';

const types = ActionTypes.USER;
const common = ActionTypes.COMMON;
const api = Api.USER;


let user_actions={
    showToast:(params = {})=>{
        params = {...params};
        let o={
            type:common.get('SHOWTOAST'),
        };
        //信息
        if(params.msg){
            o.msg = params.msg;
        }
        //模式
        if(params.model){
            o.model = params.model;
        }
        return o;
    },
    hideToast:()=>{
        return {
            type:common.get('HIDETOAST')
        };
    },
    fetchYiLiCoinDetailList:(params)=>{
        params = {
            pageSize:10,
            page:1,
            ...params};
    	//获取易力币明细列表
        return {
            type: types.get('GET_YILI_COIN_DETAIL_LIST'),
            payload: {
                request: {
                    url: api.get('GET_YILI_COIN_DETAIL_LIST'),
                    params
                }
            }
        }
    },
    //获取用户信息
    fetchUserInfo:()=>{
        return {
            type: types.get('GET_USERINFO'),
            payload: {
                request: {
                    url: api.get('GET_USERINFO')
                }
            }
        }
    },
    //获取收货地址
    fetchAddress:()=>{
        return {
            //type: types.get('GET_ADDRESS'),
            types: [types.get('GET_ADDRESS'),`${types.get('GET_ADDRESS')}_SUCCESS`,common.get('SHOWTOAST')],
            payload: {
                request: {
                    url: api.get('GET_ADDRESS')
                }
            }
        }
    },
    //选中收货地址
    selectAddress:(address)=>{
        return {
            type: types.get('SELECT_ADDRESS'),
            data:address
        };
    },
    selectAddressById:(id)=>{
       return {
           type: types.get('SELECT_ADDRESS_ID'),
           payload: {
               id:id
           }
       }
    },
    setDefaultAddress:(params)=>{
        params = {...params};
        return {
            type: types.get('SET_DEFAULT_ADDRESS'),
            payload: {
                request: {
                    url: api.get('SET_DEFAULT_ADDRESS'),
                    params
                }
            }
        }
    },
    clearSelectAddress:(address)=>{
        return {
            type: types.get('CLEAR_SELECT_ADDRESS'),
            data:address
        };
    },
    //提交新增地址
    postAddress:(params)=>{
        params = {...params,method:"save"};
        params= Utils.qsData(params);
        return {
            type: types.get('POST_ADDRESS'),
            payload: {
                request: {
                    url: api.get('POST_ADDRESS'),
                    method:"post",
                    data: params
                }
            }
        }
    },
    //修改地址
    editAddress:(params)=>{
        params = {...params,method:"update"};
        params= Utils.qsData(params);
        return {
            type: types.get('EDIT_ADDRESS'),
            payload: {
                request: {
                    url: api.get('EDIT_ADDRESS'),
                    data: params,
                    method:"post"
                }
            }
        }
    },
    deleteAddress:(params)=>{
        params = {...params};
        return {
            type: types.get('DEL_ADDRESS'),
            payload: {
                request: {
                    url: api.get('DEL_ADDRESS'),
                    params
                }
            }
        }
    },
    //提交订单
    submitOrder:(params)=>{
        params = {...params};
        params= Utils.qsData(params);
        return {
            types: [common.get('SHOWLOADING'),types.get('SUBMIT_ORDER'),common.get('SHOWTOAST')],
            payload: {
                request: {
                	method:"post",
                    url: api.get('SUBMIT_ORDER'),
                    data:params
                }
            }
        }
    },
    fetchTransactionDetail:(params)=>{
        params = {
            pageSize:6,
            page:1,
            ...params};
        return {
            type: types.get('GET_TRANSACTION_DETAIL'),
            payload: {
                request: {
                    url: api.get('GET_TRANSACTION_DETAIL'),
                    params
                }
            }
        }
    },
    //获取验证码
    getCode:(params)=>{
        params = {...params};
        return {
            type: types.get('GET_CODE'),
            payload: {
                request: {
                    url: api.get('GET_CODE'),
                    params
                }
            }
        }
    },
    //提交id身份认证表单
    postId:(params)=>{
        params = {...params};
        return {
            type: types.get('POST_ID'),
            payload: {
                request: {
                    url: api.get('POST_ID'),
                    params
                }
            }
        }
    },
    postTaskOrder:(params)=>{
        params = {...params};
        return {
            type: types.get('POST_TASK_ORDER'),
            payload: {
                request: {
                    url: api.get('POST_TASK_ORDER'),
                    params
                }
            }
        }
    },
    //清空任务工单
    clearTaskOrder:()=>{
        return {
            type: types.get('CLEAR_TASK_ORDER')
        }
    },
    postTaskSubmit:(params)=>{
        params = {...params};
        //object转化为qsData;
        params= Utils.qsData(params);
        return {
            type: types.get('POST_TASK_SUBMIT'),
            payload: {
                request: {
                    url: api.get('POST_TASK_SUBMIT'),
                    method:"post",
                    data: params
                }
            }
        }
    },
    //删除工单
    deleteWorder:(params)=>{
        params = {...params};
        return {
            type: types.get('DEL_WORDER'),
            payload: {
                request: {
                    url: api.get('DEL_WORDER'),
                    params
                }
            }
        }
    },
    //获取定位
    getLocation:(params)=>{
        params = {...params};
        return {
            type: types.get('GET_LOCATION'),
            payload: {
                request: {
                    url: api.get('GET_LOCATION'),
                    params
                }
            }
        }
    },
    //获取我的工单列表
    getSheetList:(params)=>{
        params = {
            page:1,
            pageSize:5,
            status:0,
            ...params};
        return {
            type: types.get('GET_SHEET_LIST'),
            payload: {
                request: {
                    url: api.get('GET_SHEET_LIST'),
                    params
                }
            }
        }
    },
    //查看工单
    getSheetDetail:(params)=>{
        params = {...params};
        return {
            type: types.get('SHEET_DETAIL'),
            payload: {
                request: {
                    url: api.get('SHEET_DETAIL'),
                    params
                }
            }
        }
    },
    //上传文件
    uploadFile:(params)=>{
        params = {...params};
        params.base64Data = encodeURIComponent(params.base64Data);
        params= Utils.qsData(params);
        return {
            type: types.get('UPLOAD_FILE'),
            payload: {
                request: {
                    url: api.get('UPLOAD_FILE'),
                    method:"post",
                    data:params
                }
            }
        }
    },
    //提交工单
    submitSheet:(params)=>{
        params = {...params};
        return {
            type: types.get('SHEET_SUBMIT'),
            payload: {
                request: {
                    url: api.get('SHEET_SUBMIT'),
                    params
                }
            }
        }
    }
};

export default user_actions
