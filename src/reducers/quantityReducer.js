import { GET_NEWQUANTITY } from "../actions/quantityAction";
const IntialState = {};
const quantityReducer = (state = IntialState, action) => {
  //console.log(IntialState);
  switch (action.type) {
    case GET_NEWQUANTITY:
      return action.payload;

    default:
      return state;
  }
};
export default quantityReducer;
