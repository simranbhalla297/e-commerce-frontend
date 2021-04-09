export const GET_REVIEWS = " GET_REVIEWS";
export const getReviews = (productId) => ({
  type: GET_REVIEWS,
  payload: productId,
});
