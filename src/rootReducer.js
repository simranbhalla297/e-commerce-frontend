import { combineReducers } from "redux";
import productReducer from "./reducers/productReducer";
import userReducer from "./reducers/userReducer";
import cartReducer from "./reducers/cartReducer";

const rootReducer = combineReducers({
  products: productReducer,
  userInfo: userReducer,
  cart: cartReducer,
});
export default rootReducer;
