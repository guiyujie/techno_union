import * as ActionTypes from 'ActionTypes';

const user = ActionTypes.USER;


const initialState = {
    curAction:"",     //当前
    /**
     * 用户列表：有哪些用户，包含分页信息
     * @type {[Object]}
     */
    userInfo:null,
    list:[],            //[]交易明细列表
    listPage:0,
    scoreCount:0,
    moneyCount:0,
    "addressList":"",   //[]
    defaultAddress:{},
    "selectAddress":"",  //{}
    "yiLiCoinDetailData":"", //易力币数据 {datas:[]} ,
    taskOrder:"",       //任务表单提交存储
    processSheet:"",   //待审核工单 []
    passedSheet:"",    //已审核工单 []
    failedSheet:""     //审核不通过工单 []
};

//state的处理方法
const m={
    //获取默认地址
    //如果没有默认地址就取第一条地址数据
    //isDefault==0是默认地址
    getDefaultAddress:(arr)=>{
        let newArr = arr.filter((item)=>item.isDefault==1);
        return newArr[0]||{}
    },
    //选中对应Id为默认地址
    getAddressById:(list,id)=> {
        let newArr = list.filter((item) => item.id == id);
        return newArr[0] || "";
    },
    delAddressById:(list,id)=>{
        let newArr = list.filter((item) => item.id != id);
        return newArr;
    },
    genSheet:(state,d,n)=>{
        let o = {...state};
        if(d.page == 1){
            o[n] = d;
        }else{
            o[n] = {...state[n],
                "totalCount":d.totalCount,
                "page":d.page,//当前页码
                "pageSize":d.pageSize,//每页显示记录数
                "datas" : [].concat(state[n].datas,d.datas)
            };
        }
        //计算maxPage
        o[n].maxPage = Math.ceil(d.totalCount/d.pageSize);
        return o;
    }
};


export default function UserReducer(state = initialState, action) {
	switch(action.type){
        case `${user.get('GET_USERINFO')}_SUCCESS`:
            return {...state,userInfo:action.payload.data.data.userInfo};
        case `${user.get('GET_ADDRESS')}_SUCCESS`:
            //修正数据错误
            if(!action.payload.data.data){
                action.payload.data.data = {datas:[]};
            }
            let newState = {...state,
                addressList:action.payload.data.data.datas,
                defaultAddress:m.getDefaultAddress(action.payload.data.data.datas)
            };
            //设置使用上次新增的地址
            if(state.selectNewAddress){
                newState.selectAddress = action.payload.data.data.datas[action.payload.data.data.datas.length-1];
                newState.selectNewAddress = 0;
            }
            return newState;
        case  `${user.get('SET_DEFAULT_ADDRESS')}_SUCCESS`:
            var id=action.payload.config.params.id;
            var newState ={
                ...state,
                defaultAddress:m.getAddressById(state.addressList,id)
            };
            newState.addressList.every((item)=>{
                item.isDefault = item.id==id?1:0;
                return true;
            });
            return newState;
        case `${user.get('GET_TRANSACTION_DETAIL')}_SUCCESS`:
            let newList = action.payload.data.data.datas ||[];
            let listPage = action.payload.data.data.pagination || {curPage:1};

            return {
                ...state,
                list:listPage.curPage==1?newList:state.list.concat(newList),
                listPage:listPage
            };
        case `${user.get('SELECT_ADDRESS_ID')}`:
            var id =action.payload.id;
            if(id==-1){
                return {...state, selectAddress:"",selectNewAddress:1};
            }else{
                return {...state, selectAddress:m.getAddressById(state.addressList,action.payload.id),selectNewAddress:0};
            }
        case `${user.get('SELECT_ADDRESS')}`:
                return {...state, selectAddress:action.data};

        case `${user.get('CLEAR_SELECT_ADDRESS')}`:
                return {...state, selectAddress:""};
        case `${user.get('DEL_ADDRESS')}_SUCCESS`:
                var id = action.payload.config.params.id;
                var newState = {
                    ...state,
                    addressList:m.delAddressById(state.addressList,id)
                };
                if(state.selectAddress.id == id){
                    newState.selectAddress = "";
                }
                return newState;
        case  `${user.get('GET_YILI_COIN_DETAIL_LIST')}_SUCCESS`:
            let data = action.payload.data.data;
            if(data.page==1){
                return {...state, yiLiCoinDetailData:data};
            }else{
                let newDatas =  {...data,datas:state.yiLiCoinDetailData.datas.concat(data.datas)};
                return {...state,
                    yiLiCoinDetailData:newDatas
                };
            }
        break;
        case  `${user.get('GET_SHEET_LIST')}_SUCCESS`:
            let d =action.payload.data.data;
            switch(action.payload.config.params.status){
                case 0:
                     return m.genSheet(state,d,"processSheet");
                    break;
                case 1:
                    return m.genSheet(state,d,"passedSheet");
                    break;
                case 2:
                    return m.genSheet(state,d,"failedSheet");
                    break;
            }
            return {...state};

         case  `${user.get('POST_TASK_ORDER')}_SUCCESS`:
             return {...state, taskOrder:action.payload.config.params};
        case `${user.get('CLEAR_TASK_ORDER')}`:
            return {...state,taskOrder:""};
         default:
			return state;
	}
}

