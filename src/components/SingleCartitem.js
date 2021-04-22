import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromcart } from "../actions/cartActions";
import { updateCartItem } from "../actions/cartActions";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
function SingleCartitem({ item }) {
  const [qty, setQty] = useState(item.quantity);
  var token = JSON.parse(localStorage.getItem("token"));
  //console.log(token);
  const dispatch = useDispatch();
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
  const itemRemovefromCart = async (id) => {
    // console.log("item remove" + id);
    //alert("hi");
    var apiurl = `http://localhost:5000/cartItem/cartItems/${id}`;
    let response = await fetch(apiurl, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-auth-token": token,
      },
    });
    if (response.ok) {
      const json = await response.json();
      console.log(json);
    } else {
      // console.log("fetch error");
    }
    dispatch(removeFromcart(id));
  };
  const onQtyChange = async (e, id) => {
    // console.log(id);
    setQty(e.target.value);
    const response = await fetch(
      `http://localhost:5000/cartItem/qtychange/${id}`,
      {
        method: "POST",
        body: JSON.stringify({ quantity: e.target.value }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-auth-token": token,
        },
      }
    );
    if (response.ok) {
      dispatch(updateCartItem(Number(e.target.value), id));
    } else {
      // console.log("fetch error");
    }
  };

  return (
    <div>
      <div className="cart">
        <div className="cartitem_image">
          <img
            src={item.image}
            alt="image"
            className="cart_image"
            style={{ width: "180px", height: "200px" }}
          />
        </div>
        <div>
          <h5>{item.productname}</h5>

          <div className="quantityContainer">
            <label style={{ marginTop: "5px" }}>Quantity:</label>
            <select
              className="selectBox"
              value={qty}
              onChange={(e) => onQtyChange(e, item._id)}
            >
              {selectQuantity()}
            </select>
          </div>
          <div
            style={{
              display: "flex",
              borderRight: "1px solid blsxk",
              justifyContent: "space-between",
            }}
          >
            <p>Price:₹{item.price}</p>
            <Button
              className="cartitem_deleteBtn"
              onClick={() => itemRemovefromCart(item._id)}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default connect()(SingleCartitem);
