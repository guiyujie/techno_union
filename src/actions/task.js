import ActionTypes from 'ActionTypes';
import Api from 'Api';

const types = ActionTypes.TASK;
const api = Api.TASK;


let actions={
    /**
     任务
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
            isPage:true,
            biId:17, //表示盛天币
            bCode:'UC',
            orderField:'exchange_num',
            orderAes:false,
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
    //清除商品详情
    clearGoodsDetail:()=>{
        return {
            type:types.get('GOODS_DETAIL_CLEAR')
        }
    }
};
export default actions
