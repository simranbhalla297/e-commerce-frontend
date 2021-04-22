export const ADD_TO_FAVITEMS = "ADD_TO_FAVITEMS";
export const addFavitems = (favitem) => ({
  type: ADD_TO_FAVITEMS,
  payload: favitem,
});
