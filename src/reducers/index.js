import userReducer from './user';
import messageReducer from './message';
import { websocketReducer } from './websocket';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    user: userReducer,
    message: messageReducer,
    websocket: websocketReducer
})

export default allReducers;