import { combineReducers } from "redux";

import authReducer from "./authreducer";
import postReducer from "./postreducer";
export const reducers = combineReducers({
    authReducer,postReducer
})