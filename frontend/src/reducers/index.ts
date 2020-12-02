import { combineReducers } from 'redux';

import AuthReducer from './authReducer'
import userReducer from './userReducer';

export default combineReducers({
    auth: AuthReducer,
    users: userReducer,
})