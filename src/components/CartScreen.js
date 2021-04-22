import React, { useEffect } from "react";
import CartItem from "./CartItem";
import { CLEAR_CART } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
function CartScreen() {
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cart);
  // console.log(cartList);
  const clearCart = () => {
    // console.log("cart clear");
    dispatch({ type: CLEAR_CART });
  };

  return (
    <>
      <div className="cartscreen" style={{ backgroundColor: "#eaeded" }}>
        <div>
          <Row>
            <Col lg={9}>
              <div className="cartscreen_left">
                <div
                  style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    margin: "20px",
                  }}
                >
                  <h1
                    style={{
                      fontWeight: "400",
                      fontSize: "28px",
                      lineHeight: "36px",
                    }}
                  >
                    Shopping cart
                  </h1>
                  <p
                    onClick={clearCart}
                    style={{
                      color: "#007185",
                      fontSize: "18px",
                      textTransform: "capitalize",
                    }}
                  >
                    clear cart
                  </p>
                  <CartItem />
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div className="cartscreen_right">
                <div className="cartscreen_info">
                  <p>
                    Subtotal (
                    {cartList.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                    <span> items</span>)
                    <strong>
                      ₹
                      {cartList
                        .reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )
                        .toFixed(2)}
                    </strong>
                  </p>

                  <div>
                    <Button className="proccedTocart">
                      Proceed To checkout
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default connect()(CartScreen);
