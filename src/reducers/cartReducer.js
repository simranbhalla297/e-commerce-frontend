import { ADD_TO_CART } from "../actions/cartActions";
//import { REMOVE_FROM_CART } from "../actions/cartActions";
//import { CART_RESET } from "../actions/cartActions";
export const initialState = [];
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      var list = [...state, action.payload];
      console.log(list);
      return list;

    default:
      // this is fine.
      return state;
  }
};
export default cartReducer;
