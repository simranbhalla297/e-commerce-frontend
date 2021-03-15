export const USER_LOGIN = "USER_LOGIN";
export const getuserLoginDetails = (userData) => ({
  type: USER_LOGIN,
  payload: userData,
});
