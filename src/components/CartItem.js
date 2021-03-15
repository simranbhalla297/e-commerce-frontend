import React from "react";
//import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function CartItem() {
  const cartList = useSelector((state) => state.cart);
  console.log(cartList);
  return (
    <div className="cartitem">
      {cartList.map((list) => {
        return (
          <div>
            <div className="cartitem_image">
              <img src={list.product.image} alt="image" />
            </div>
            <div>
              <p>Price:{list.product.price}</p>
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <button className="cartitem_deleteBtn">delete item</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
