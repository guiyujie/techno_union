/**
 * 注,此处定义为动作
 *  通用行为的定义
 *  用户行为的定义
 */

/**
*  通用
*/
export const COMMON = {
	OPTSTATUS:  'OPTSTATUS',
    SHOWLOADING:'SHOWLOADING',
    SHOWTOAST:  'SHOWTOAST',
    HIDETOAST:  'HIDETOAST'
};

/**
*  用户管理
*/
export const USER = {
    GET_CODE:"GET_CODE",          //获取手机验证码
    GET_YILI_COIN_DETAIL_LIST:"GET_YILI_COIN_DETAIL_LIST",//获取易力币明细列表
    GET_USERINFO:"GET_USERINFO", //获取用户信息
    GET_ADDRESS:"GET_ADDRESS", //获取收货地址
    SELECT_ADDRESS:"SELECT_ADDRESS",//选中收货地址
    CLEAR_SELECT_ADDRESS:"CLEAR_SELECT_ADDRESS",//取消选中收货地址
    POST_ADDRESS:"POST_ADDRESS",//提交新增地址
    EDIT_ADDRESS:"editAddress",  //编辑地址
    DEL_ADDRESS:"DEL_ADDRESS",  //删除地址
    "SET_DEFAULT_ADDRESS":"SET_DEFAULT_ADDRESS", //设置默认地址,
    SELECT_ADDRESS_ID:"SELECT_ADDRESS_ID",//根据id选中地址

    POST_ID:"POST_ID",          //提交身份认证
    POST_TASK_ORDER:"POST_TASK_ORDER", //提交工单
    CLEAR_TASK_ORDER:"CLEAR_TASK_ORDER", //清除工单信息

    POST_TASK_SUBMIT:"POST_TASK_SUBMIT",//提交工单照片

    SUBMIT_ORDER:"SUBMIT_ORDER", //提交订单
    DEL_WORDER:"DEL_WORDER", //删除工单
    GET_TRANSACTION_DETAIL:"GET_TRANSACTION_DETAIL",//获取订单明细

    "GET_SHEET_LIST":"GET_SHEET_LIST", //获取我的工单列表
    "SHEET_DETAIL":"SHEET_DETAIL",       //查看工单
    "GET_LOCATION":"GET_LOCATION", //获取定位
    "SHEET_SUBMIT":"SHEET_SUBMIT",      //提交工单

    "UPLOAD_FILE":"UPLOAD_FILE",    //上传工单图片

};

/*
* 商城
* */
export const MALL = {
    NORMAL_LIST:"NORMAL_LIST",        //获取商品列表
    SWITCH_TAB:"SWITCH_TAB", //切换
    HOT_LIST:'HOT_LIST',  //推荐商品列表
    VIP_LIST:'VIP_LIST',  //vip商品列表
    GOOD_DETAIL:"GOOD_DETAIL", //商品详情
    GOOD_DETAIL_CLEAR:"GOOD_DETAIL_CLEAR",
    GET_CITYLIST:"GET_CITYLIST",

};


/*
 * 任务
 * */

export const TASK = {
    NORMAL_LIST:"NORMAL_LIST",        //获取商品列表
    SWITCH_TAB:"SWITCH_TAB", //切换
    HOT_LIST:'HOT_LIST',  //推荐商品列表
    VIP_LIST:'VIP_LIST',  //vip商品列表
    GOOD_DETAIL:"GOOD_DETAIL", //商品详情
    GOOD_DETAIL_CLEAR:"GOOD_DETAIL_CLEAR",
};
