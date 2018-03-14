/**
*  通用
*/
export const COMMON = {

};

/**
*  用户管理
*/
export const USER = {
    "GET_YILI_COIN_DETAIL_LIST":'/api/user/getYiLiCoinDetailList.do',
    "GET_USERINFO":'/api/user/getUserInfo.do',
    "GET_ADDRESS":'/api/mall/getAddressList.do',
    "POST_ADDRESS":'/api/mall/saveOrUpdateAddress.do',
    "EDIT_ADDRESS": '/api/mall/saveOrUpdateAddress.do',
    "GET_CODE":"/api/user/sendPhoneCode.do",
    "POST_ID":"/api/user/saveUserInfo.do",
    "POST_TASK_ORDER":"/api/sheet/checkGid.do",

    "POST_TASK_SUBMIT":"/api/sheet/submitSheet.do",
    "DEL_ADDRESS": "/api/mall/deleteAddress.do",
    "SET_DEFAULT_ADDRESS":"/api/mall/setDefaultAddress.do",

    "SUBMIT_ORDER":'/api/mall/exchange.do',
    "DEL_WORDER":"/api/sheet/deleteSheet.do",
    "GET_TRANSACTION_DETAIL":'/api/mall/getExchangeList.do',

    "GET_SHEET_LIST":"/api/sheet/mySheetList.do", //获取我的工单列表
    "SHEET_DETAIL":"/api/sheet/viewSheet.do",       //查看工单
    "GET_LOCATION":"/api/sheet/getLocationInfo.do", //获取定位
    "SHEET_SUBMIT":"/api/sheet/submitSheet.do",      //提交工单

    "UPLOAD_FILE":"/api/file/base64Upload.do",    //上传工单图片
};

/*
* 商城
* */
export const MALL = {
      "PRODUCT_LIST":'/api/mall/getGoodsList.do',  //获取商品列表
      "GOOD_DETAIL":'/api/mall/getGoodsInfo.do',   //获取商品详情
      "GET_CITYLIST":'/api/mall/getProvinceCityList.do' //获取省市列表
};

/**
 * 任务中心
 */
export const TASK = {


};
