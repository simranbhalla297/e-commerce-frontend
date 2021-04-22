import { GET_PRODUCTS } from "../actions/productActions";
import { REMOVE_PRODUCT } from "../actions/productActions";
import { UPDATE_PRODUCT } from "../actions/productActions";
const IntialState = [];
const productReducer = (state = IntialState, action) => {
  console.log(IntialState);
  switch (action.type) {
    case GET_PRODUCTS:
      return action.payload;

    case REMOVE_PRODUCT:
      return state.filter((x) => x._id !== action.payload);

    case UPDATE_PRODUCT:
      return action.payload;
    default:
      // this is fine.
      return state;
  }
};
export default productReducer;
