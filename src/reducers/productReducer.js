import { GET_PRODUCTS } from "../actions/productActions";

const IntialState = [];
const productReducer = (state = IntialState, action) => {
  console.log(IntialState);
  switch (action.type) {
    case GET_PRODUCTS:
      return action.payload;

    default:
      // this is fine.
      return state;
  }
};
export default productReducer;
