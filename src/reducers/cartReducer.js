import { ADD_TO_CART } from "../actions/cartActions";
import { REMOVE_FROM_CART } from "../actions/cartActions";
import { CLEAR_CART } from "../actions/cartActions";
import { SET_CARTLIST } from "../actions/cartActions";
import { UPDATE_CARTITEM } from "../actions/cartActions";
export const initialState = [];
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_CART:
      return [];
    case ADD_TO_CART:
      const item = action.payload;
      // console.log(item);
      //find if item exists
      //console.log(state);

      const existItem = state.find((x) => x._id === item._id);
      // console.log(existItem);

      if (!existItem) {
        return [...state, item];
      } else {
        alert("Product already in cart");
        return state;
      }

    //var list = [...state, action.payload];
    //console.log(list);
    //return list;
    case UPDATE_CARTITEM:
      return state.map((cartitem) => {
        if (cartitem._id === action.payload.id) {
          cartitem.quantity = action.payload.qty;
        }
        return cartitem;
      });

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
