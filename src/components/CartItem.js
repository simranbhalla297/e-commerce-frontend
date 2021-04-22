import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { setlist } from "../actions/cartActions";
import SingleCartitem from "../components/SingleCartitem";
function CartItem() {
  const dispatch = useDispatch();
  var token = JSON.parse(localStorage.getItem("token"));
  // console.log(token);
  const cartList = useSelector((state) => state.cart);

  const getCartList = async () => {
    var apiurl = "http://localhost:5000/cartItem/cartItems";
    let response = await fetch(apiurl, {
      method: "POST",
      //send request to server
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
        "x-auth-token": token,
      },
    });
    if (response.ok) {
      const json = await response.json();
      // console.log(json.cartitems);
      dispatch(setlist(json.cartitems));
      // setCart(json.cartitems);
    } else {
      //console.log("fetch error");
    }
  };

  useEffect(() => {
    getCartList();
  }, []); //cart

  return (
    <div>
      {cartList.length === 0 ? (
        <div>
          {" "}
          <h2>Your cart is empty</h2>
          <p>
            Your shopping cart is waiting. Give it purpose – fill it with
            groceries, clothing, household supplies, electronics and more.
          </p>
        </div>
      ) : (
        <div>
          {cartList.map((item) => {
            return <SingleCartitem item={item} />;
          })}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <h5>
              Subtotal ({cartList.reduce((acc, item) => acc + item.quantity, 0)}
              ) items ₹
              {cartList
                .reduce((acc, item) => acc + item.quantity * item.price, 0)
                .toFixed(2)}
            </h5>
          </div>
        </div>
      )}
    </div>
  );
}

export default connect()(CartItem);
