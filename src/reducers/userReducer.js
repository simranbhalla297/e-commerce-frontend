import { USER_LOGIN } from "../actions/userActions";
const IntialState = {
  isAuthenticated: null,
  user: null,
};
const userReducer = (state = IntialState, action) => {
  //console.log(IntialState);
  switch (action.type) {
    case USER_LOGIN:
      return {
        user: action.payload,
        isAuthenticated: true,
      };

    default:
      // this is fine.
      return state;
  }
};
export default userReducer;
