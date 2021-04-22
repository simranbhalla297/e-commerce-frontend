import { ADD_TO_FAVITEMS } from "../actions/favActions";
const IntialState = [];
const favReducer = (state = IntialState, action) => {
  console.log(IntialState);
  switch (action.type) {
    case ADD_TO_FAVITEMS:
      var list = [...state, action.payload];
      console.log(list);
      return list;
    default:
      // this is fine.
      return state;
  }
};
export default favReducer;
