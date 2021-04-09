import { ADD_TO_CART } from "../actions/cartActions";
import { REMOVE_FROM_CART } from "../actions/cartActions";
import { CLEAR_CART } from "../actions/cartActions";
import { SET_CARTLIST } from "../actions/cartActions";
export const initialState = [];
const cartReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case CLEAR_CART:
      return [];
    case ADD_TO_CART:
      var list = [...state, action.payload];
      console.log(list);
      return list;
    case REMOVE_FROM_CART:
      return state.filter((x) => x._id !== action.payload);
    case SET_CARTLIST:
      return action.payload;
    default:
      // this is fine.
      return state;
  }
};
export default cartReducer;
