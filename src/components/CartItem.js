import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { removeFromcart, setlist } from "../actions/cartActions";
import { getNewQuantity } from "../actions/quantityAction";

function CartItem() {
  const dispatch = useDispatch();
  var token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
  const cartList = useSelector((state) => state.cart);
  console.log(cartList);
  const itemQuantity = useSelector((state) => state.qty);
  console.log(itemQuantity);

  const getCartList = async () => {
    var apiurl = "http://localhost:5000/cartItem/cartItems";
    let response = await fetch(apiurl, {
      method: "POST",
      //send request to server
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
    });
    if (response.ok) {
      const json = await response.json();
      console.log(json.cartitems);
      dispatch(setlist(json.cartitems));
      // setCart(json.cartitems);
    } else {
      console.log("fetch error");
    }
  };

  const onQtyChange = (e, id) => {
    console.log(id);
    fetch(`http://localhost:5000/cartItem/qtychange/${id}`, {
      method: "POST",
      body: JSON.stringify({ quantity: e.target.value }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-auth-token": token,
      },
    }).then((res) => {
      alert("data changed");
    });
    dispatch(getNewQuantity(e.target.value, id));
    console.log(e.target.value);
  };

  const selectQuantity = () => {
    var arr = [];

    for (let i = 1; i <= 20; i++) {
      arr.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return arr;
  };
  useEffect(() => {
    getCartList();
  }, []); //cart
  const itemRemovefromCart = async (id) => {
    console.log("item remove" + id);
    //alert("hi");
    var apiurl = `http://localhost:5000/cartItem/cartItems/${id}`;
    let response = await fetch(apiurl);
    if (response.ok) {
      const json = await response.json();
      console.log(json);
    } else {
      console.log("fetch error");
    }
    dispatch(removeFromcart(id));
  };

  return (
    <div>
      {cartList.length === 0 ? (
        "no item in cart"
      ) : (
        <div>
          {cartList.map((item) => {
            return (
              <div className="cart">
                <div className="cartitem_image">
                  <img src={item.image} alt="image" className="cart_image" />
                </div>
                <div>
                  <h5>{item.productname}</h5>
                  <p>Price:{item.price}</p>
                  <div className="quantityContainer">
                    <label style={{ marginTop: "5px" }}>Quantity:</label>
                    <select
                      className="selectBox"
                      value={item.quantity}
                      onChange={(e) => onQtyChange(e, item._id)}
                    >
                      {selectQuantity()}
                    </select>
                  </div>
                  <button
                    className="cartitem_deleteBtn"
                    onClick={() => itemRemovefromCart(item._id)}
                  >
                    delete item
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default connect()(CartItem);
