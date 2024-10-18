import {compose,applyMiddleware} from "redux"
import { legacy_createStore as createStore } from "redux";


import { rootReducer } from './reducers/index'
import thunk from "redux-thunk"
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store=createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))