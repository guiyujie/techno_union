import {
    applyMiddleware,
    compose,
    createStore
} from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import axiosMiddlewareConfig from '../config/axios_middleware_config';
import axiosInstance from 'Ajax';
import rootReducer from 'reducers';

export default function configureStore(initialState, reducers) {
    const store = createStore(
        rootReducer(reducers),
        initialState,
        compose(
            applyMiddleware(axiosMiddleware(axiosInstance, axiosMiddlewareConfig))
        )
    );

    return store
}
