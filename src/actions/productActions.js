export const GET_PRODUCTS = "GET_PRODUCTS";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const getProducts = (list) => ({
  type: GET_PRODUCTS,
  payload: list,
});
export const removeProduct = (id) => ({
  type: REMOVE_PRODUCT,
  payload: id,
});
export const updateProduct = (id) => ({
  type: UPDATE_PRODUCT,
  payload: id,
});

//action creators
