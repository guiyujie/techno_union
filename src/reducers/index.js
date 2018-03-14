import { combineReducers } from 'redux';
//引入reducers
import common from './common_reducer';
import user from './user_reducer';
import mall from './mall_reducer';
import detail from './detail_reducer';

export default function rootReducer (reducers){
	return combineReducers({
		common,
	    user,
        mall,
        detail,
	    ...reducers
	});
}
