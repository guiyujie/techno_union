import {
    applyMiddleware,
    compose,
    createStore
} from 'redux'
import axiosMiddleware from 'redux-axios-middleware'
import axiosMiddlewareConfig from '../config/axios_middleware_config'
import axiosInstance from 'Ajax'
import rootReducer from 'reducers'
import DevTools from '../containers/devtools'

export default function configureStore(initialState, reducers) {
    const store = createStore(
        rootReducer(reducers),
        initialState,
        compose(
            applyMiddleware(axiosMiddleware(axiosInstance, axiosMiddlewareConfig)),
            //redux调试工具
            DevTools.instrument()
        )
    );

    //支持webpack热重启
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')(reducers);

            store.replaceReducer(nextRootReducer)
        })
    };

    return store
}
