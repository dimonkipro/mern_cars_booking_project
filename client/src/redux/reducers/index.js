import { combineReducers } from "redux";
import { productReducer, invoiceReducer } from "./reducers";
import {userReducer} from './reducersU';
import sidebarReducer from "./sidebarReducer";
export const rootReducer = combineReducers({
  productReducer,
  userReducer,
  invoiceReducer,
  sidebar: sidebarReducer,
});