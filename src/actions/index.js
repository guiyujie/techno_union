import ActionTypes from 'ActionTypes';
import Api from 'Api';

const types = ActionTypes.MALL;
const api = Api.MALL;


let actions={
    /**
     首页
     **/
    //导航切换
    switchNavTab:(item)=>{
        return {
            type:types.get('SWITCH_TAB'),
            currentNav:item
        }
    },
    //获取商品列表
    fetchGoodsList:(params)=>{
        params = {
                page:1,
                pageSize:12,
                ...params
            };
        return {
            type: types.get('NORMAL_LIST'),
            payload: {
                request: {
                    url: api.get('PRODUCT_LIST'),
                    params
                }
            }
        }
    },
    //获取商品详情
    fetchGoodsDetail:(params)=>{
        params = {...params};
        return {
            type: types.get('GOOD_DETAIL'),
            payload: {
                request: {
                    url: api.get('GOOD_DETAIL'),
                    params
                }
            }
        }
    },
    //获取省市列表
    getProvinceCityList:()=>{
        return {
            type: types.get('GET_CITYLIST'),
            payload: {
                request: {
                    url: api.get('GET_CITYLIST')
                }
            }
        }
    },
    //清除商品详情
    clearGoodsDetail:()=>{
        return {
            type:types.get('GOODS_DETAIL_CLEAR')
        }
    }
};
export default actions
