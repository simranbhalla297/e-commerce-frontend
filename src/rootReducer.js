import { combineReducers } from "redux";
import productReducer from "./reducers/productReducer";
import userReducer from "./reducers/userReducer";
import cartReducer from "./reducers/cartReducer";
import reviewReducer from "./reducers/reviewReducer";

import favReducer from "./reducers/favReducer";
const rootReducer = combineReducers({
  products: productReducer,
  userInfo: userReducer,
  cart: cartReducer,
  review: reviewReducer,
  favitem: favReducer,
});
export default rootReducer;
