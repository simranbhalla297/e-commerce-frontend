import { ADD_TO_FAVITEMS } from "../actions/favActions";
import { SET_FAVLIST } from "../actions/favActions";
import { REMOVE } from "../actions/favActions";
const IntialState = [];
const favReducer = (state = IntialState, action) => {
  console.log(IntialState);
  switch (action.type) {
    case ADD_TO_FAVITEMS:
      var list = [...state, action.payload];
      console.log(list);
      return list;
    case SET_FAVLIST:
      return action.payload;
    case REMOVE:
      return state.filter((x) => x.productid !== action.payload);
    default:
      // this is fine.
      return state;
  }
};
export default favReducer;
