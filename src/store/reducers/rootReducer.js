import { combineReducers } from 'redux';
import authReducer from './authReducer';
import roomReducer from './roomReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    rooms: roomReducer,
});

export default rootReducer;