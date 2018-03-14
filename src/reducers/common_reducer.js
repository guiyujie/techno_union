import * as ActionTypes from 'ActionTypes';

const types = ActionTypes.COMMON;

const initialState = {
     /**
     * 操作状态
     * @type {String}
     */
    optStatus: '',
    /**
     * 提示信息
     * @type {String}
     */
    msg: '',
    /**
     * 是否展示
     * @type {bool}
     */
    show:false,
    model:false
};


export default function CommonReducer(state = initialState, action) {
    switch(action.type){
        //通用状态,在不显示下
        case `${types.get('OPTSTATUS')}`:
            if(!state.show){
                return {...state,
                    optStatus: action.optStatus,
                    //show:action.optStatus=="loading...",
                    //model:false,
                    msg: action.msg
                };
            }
            return state;
            break;
        //显示提示
        case `${types.get('SHOWLOADING')}`:
            return  {...state, show:true,msg:action.msg||"正在操作",model:true};
            break;
            //显示提示
        case `${types.get('SHOWTOAST')}`:
            return  {...state, show:true,msg:action.msg||state.msg,model:false};
            break;
        case `${types.get('HIDETOAST')}`:
            return  {...state,
                msg:"",
                show:false,
                model:false
            };
            break;
        default:
            return state;
    }
}
