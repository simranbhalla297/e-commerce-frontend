export const GET_NEWQUANTITY = "GET_NEWQUANTITY";
export const getNewQuantity = (qty, id) => ({
  type: GET_NEWQUANTITY,
  payload: { qty, id },
});
