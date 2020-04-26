import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import allReducers from '../reducers';
import  wsMiddleware from '../middleware/middleware';

const middleware = [reduxThunk, wsMiddleware];
const store = createStore(
    allReducers,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;