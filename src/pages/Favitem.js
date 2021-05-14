import React, { useState, useEffect } from "react";
import { Button, Row, Col, OverlayTrigger } from "react-bootstrap";
import { remove } from "../actions/favActions";
import { addTocart } from "../actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import Details from "./Details";
import { BASE_URL } from "../Variables";
export default function Favitem({ data }) {
  const [alreadyincart, setAlreadyincart] = useState(false);
  const [show, setShow] = useState(false);
  //const [Hide, setHide] = useState(false);
  const dispatch = useDispatch();

  var productid = data.productid;
  var token = JSON.parse(localStorage.getItem("token"));
  //console.log(token);
  const cartlist = useSelector((state) => state.cart);
  const productList = useSelector((state) => state.products);
  console.log(productList);
  const onRemoveClick = (productId) => {
    //console.log("remove");
    console.log(productId);
    removeProductfromfavList(productId);
  };
  const removeProductfromfavList = async (productId) => {
    var apiurl = `${BASE_URL}/favItem/favItem/${productId}`;
    let response = await fetch(apiurl, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-auth-token": token,
      },
    });
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      dispatch(remove(productId));
    } else {
      console.log("fetch error");
    }
  };
  const onAddTocartClick = async (productData) => {
    console.log("item add to cart");
    productAddtocart(productData);
  };
  const productAddtocart = async (productData) => {
    const addProducttocart = {
      productname: productData.productname,
      price: productData.price,
      productid: productData.productid,
      image: productData.image,
      quantity: 1,
    };
    const response = await fetch("http://localhost:5000/cartItem/cartItem", {
      method: "POST",
      body: JSON.stringify(addProducttocart),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-auth-token": token,
      },
    });

    const data = await response.json();
    console.log(data);
    //console.log(data.itemsinCart);
    dispatch(addTocart(data.data));
  };

  useEffect(() => {
    console.log(cartlist);
    const findItemIncart = cartlist.find((x) => x.productid === productid);
    console.log(findItemIncart);
    if (findItemIncart) {
      setAlreadyincart(true);
    } else {
      setAlreadyincart(false);
    }
  }, [cartlist]);
  return (
    <div className="favitem_container">
      <Row>
        <Col md={2} sm={4} className="favImage-container-col">
          <div className="favImage-container">
            <Link to={`/productDetails?id=${data.productid}`}>
              <img src={data.image} alt={data.image} className="favImage" />
            </Link>
          </div>
        </Col>
        <Col md={4} sm={4}>
          <div className="favText_container" onMouseEnter={() => setShow(true)}>
            <h2>{data.productname}</h2>
            <h2> ₹{data.price}</h2>
          </div>
          {show ? (
            <div className="detail_box" onMouseLeave={() => setShow(false)}>
              <div className="arrow"></div>
              {data ? <Details data={data} /> : <h2>loading....</h2>}
            </div>
          ) : null}
        </Col>
        {alreadyincart ? (
          <Col md={6} sm={4} className="favbtn_container_col">
            <h6 style={{ color: "green" }}>
              <FaCheck />
              Added to cart
            </h6>
            <span>This item was already in your cart</span>
            <div className="favbtn_container">
              <Button className="proccedTocart" style={{ marginRight: "20px" }}>
                Proceed to chekout
              </Button>
              <Link to="/cart" className="btn btn-light my-3">
                View cart
              </Link>
            </div>
          </Col>
        ) : (
          <Col md={6} sm={3} className="favbtn_container_col">
            Item added on:{" "}
            <strong style={{ backgroundColor: "yellow" }}>
              {new Date(data.createdAt).toDateString()}
            </strong>
            <div className="favbtn_container">
              <Button
                className="btn btn-dark my-3"
                style={{ marginRight: "20px" }}
                onClick={() => onAddTocartClick(data)}
              >
                Add to cart
              </Button>
              <Button
                className="btn btn-dark my-3"
                onClick={() => onRemoveClick(data._id)}
              >
                Delete
              </Button>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
}
