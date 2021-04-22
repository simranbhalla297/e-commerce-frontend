export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const SET_CARTLIST = "SET_CARTLIST";
export const UPDATE_CARTITEM = "UPDATE_CARTITEM";
export const addTocart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromcart = (id) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});
export const setlist = (data) => ({
  type: SET_CARTLIST,
  payload: data,
});
export const updateCartItem = (qty, id) => ({
  type: UPDATE_CARTITEM,
  payload: { qty, id },
});
