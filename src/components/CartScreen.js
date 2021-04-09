import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { CLEAR_CART } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
function CartScreen() {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cart);
  console.log(cartList);
  const clearCart = () => {
    console.log("cart clear");
    dispatch({ type: CLEAR_CART });
  };

  return (
    <div className="cartscreen">
      <div className="cartscreen_left">
        <p onClick={clearCart}>clear cart</p>
        <h2>Shopping cart</h2>
        <CartItem />
      </div>
      <div className="cartscreen_right">
        <div className="cartscreen_info">
          <p>
            Subtotal ({cartList.reduce((acc, item) => acc + item.quantity, 0)})
            items
          </p>
          <p>
            ₹
            {cartList
              .reduce((acc, item) => acc + item.quantity * item.price, 0)
              .toFixed(2)}
          </p>
        </div>
        <div>
          <button>Proceed To checkout</button>
        </div>
      </div>
    </div>
  );
}

export default connect()(CartScreen);
