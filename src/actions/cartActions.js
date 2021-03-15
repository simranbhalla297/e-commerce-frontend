export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CART_RESET = "CART_RESET";

export const addTocart = (product) => ({
  type: ADD_TO_CART,
  payload: { product },
});
