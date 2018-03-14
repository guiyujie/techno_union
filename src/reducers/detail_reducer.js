import * as ActionTypes from 'ActionTypes';

const types = ActionTypes.MALL;

const initialState = {
    "data":{}
};
//默认state


const _getSTCurrency = function(item){
    const exchangeCurrencys = item.attributesMap.EXCHANGE_ITEM
    let STCurrency = 0;
    let bId,biId;

    exchangeCurrencys.forEach(function(currency){
        if(currency.biName == "易力币"){
            //盛天积分
            STCurrency = currency.productExchangeNum;
            bId = currency.bId;
            biId =  currency.biId;
        }
    });

    return [STCurrency,STCurrency,bId,biId]
}

const _getMoney = function(item){
    const exchangeCurrencys = item.attributesMap.EXCHANGE_ITEM;
    let money = 0;
    let bId,biId;

    exchangeCurrencys.forEach(function(currency){
        if(currency.biId == 13){
            //盛天积分
            money = currency.productExchangeNum;
            bId = currency.bId;
            biId =  currency.biId;
        }
    });
    return ["¥"+money,money,bId,biId]
};

const getNumber = function(item){
     return   _getSTCurrency(item);
    //return item.vipType==='2'?_getMoney(item):_getSTCurrency(item);
};

const getBname = (items,id)=>{
      let name="";
      items.every((item)=>{
           if(item.bId==id){
               name=item.biName;
               return false;
           }
           return true;
      });
      return name;
};


//抽象数据结构,并对数据进行处理的地方
const good_detail=(state= initialState, action) =>{
    switch (action.type) {
        //商城首页tab切换
        case  `${types.get('GOOD_DETAIL')}_SUCCESS`:
            const numbers = getNumber(action.payload.data.data);
            //把返回的数据合并到之前的mall_detail对象
            return Object.assign({},state,{
                    data:action.payload.data.data,
                    showNumber:numbers[0],
                    number:numbers[1],
                    bId:numbers[2],    //业务线ID
                    biId:numbers[3],   //兑换biId
                    bName:getBname(action.payload.data.data.attributesMap.EXCHANGE_ITEM,numbers[2])           //消耗币 名称
                }
            );
        case`${types.get('GOOD_DETAIL_CLEAR')}`:
            return {...state,data:{}};
        default:
            return state
    }
}


export default good_detail
