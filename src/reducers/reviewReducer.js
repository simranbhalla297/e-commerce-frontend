import { GET_REVIEWS } from "../actions/reviewActions";
const IntialState = [];
const reviewReducer = (state = IntialState, action) => {
  console.log(IntialState);
  switch (action.type) {
    case GET_REVIEWS:
      return action.payload;

    default:
      // this is fine.
      return state;
  }
};
export default reviewReducer;
