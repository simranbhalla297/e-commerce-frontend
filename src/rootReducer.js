import { combineReducers } from "redux";
import productReducer from "./reducers/productReducer";
import userReducer from "./reducers/userReducer";
import cartReducer from "./reducers/cartReducer";
import reviewReducer from "./reducers/reviewReducer";
import quantityReducer from "./reducers/quantityReducer";
const rootReducer = combineReducers({
  products: productReducer,
  userInfo: userReducer,
  cart: cartReducer,
  review: reviewReducer,
  qty: quantityReducer,
});
export default rootReducer;
