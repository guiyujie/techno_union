import * as ActionTypes from 'ActionTypes';

const types = ActionTypes.MALL;

const initialState = {
    currentNav:"tab1",  //当前tab
    "banner":[
        {
            "id": 1,
            "src": require("../static/images/banner1.png"),
            "alt": 'banner',
        }
    ],
    nav:[
        {
            "id":1,
            "name":"商城",
            "icon": "icon icon-mall-empty",
            "icon_active": "icon icon-mall",
            "alt": '商城',
            "href":"/index"
        },
        {
            "id":2,
            "name":"任务",
            "icon": "icon icon-renwu1",
            "icon_active": "icon icon-renwu",
            "alt": '充值',
            "href":"/task"
        },
        {
            "id":4,
            "name":"我的",
            "icon": "icon icon-yileyoo-empty",
            "icon_active": "icon icon-yileyoo",
            "alt": '我的',
            "href":"/home"
        }
    ],
    normalList:"",//普通商品列表
    cityList:"", //省市数据列表
};
//默认state

//抽象数据结构,并对数据进行处理的地方
const mall=(state=initialState, action) =>{
    switch (action.type) {
        //商城首页tab切换
        case `${types.get('SWITCH_TAB')}`:
            return {...state,currentNav:action.currentNav};
        case  `${types.get('NORMAL_LIST')}_SUCCESS`:
            if(!action.payload){
                return {...state};
            }
        	let response = action.payload.data.data;
            let normalNewList = response.mallProducts||[];
            //将图片前缀和图片后缀拼装起来
            normalNewList.forEach(function(item){
 				item.image = response.imagePrefix+ item.image;
            });
            let normalListPage = {
            	totalRows:response.totalCount,
            	curPage:response.pageNum
            };
            return {
                ...state,
                normalList:normalListPage.curPage==1?normalNewList:state.normalList.concat(normalNewList),
                normalListPage:normalListPage
            };
        case `${types.get('NORMAL_LIST')}_FAIL`:
            return {...state,error:action.error};
        case `${types.get('GET_CITYLIST')}_SUCCESS`:
            var res = action.payload.data.data;
            var cityList =[];
            //"code":10,"name":"北京市","sub":
            for(var i in res.provinceList){
                //获取省市数据
                res.provinceList[i].map((item)=>{
                    //转化为匹配省市的数据
                     var p  = {code:item.id,name:item.name,sub:[]};
                     //处理城市数据
                     if(res.cityList[item.id]){
                         res.cityList[item.id].map((c)=>{
                             var cc = {code:c.id,name:c.name,sub:[]};
                             //处理县
                             if(res.countyList[c.id]){
                                 res.countyList[c.id].map((x)=>{
                                     var dd = {code:x.id,name:x.name,sub:[]};
                                     cc.sub.push(dd);
                                 });
                             }
                             p.sub.push(cc);
                         })
                     }
                    cityList.push(p)
                });
            }
            return {...state,cityList:cityList};
        default:
            return state
    }
};


export default mall
