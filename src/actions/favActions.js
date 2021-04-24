export const ADD_TO_FAVITEMS = "ADD_TO_FAVITEMS";
export const SET_FAVLIST = "SET_FAVLIST";
export const REMOVE = "REMOVE";
export const addFavitems = (favitem) => ({
  type: ADD_TO_FAVITEMS,
  payload: favitem,
});
export const setFavlist = (data) => ({
  type: SET_FAVLIST,
  payload: data,
});
export const remove = (id) => ({
  type: REMOVE,
  payload: id,
});
