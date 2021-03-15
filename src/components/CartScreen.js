import React from "react";
import CartItem from "./CartItem";

function CartScreen() {
  return (
    <div className="cartscreen">
      <div className="cartscreen_left">
        <h2>Shopping cart</h2>
        <CartItem />
      </div>
      <div className="cartscreen_right">
        <div className="cartscreen_info">
          <p>Subtotal (0) items</p>
          <p>rs 799.99</p>
        </div>
        <div>
          <button>Proceed To checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
