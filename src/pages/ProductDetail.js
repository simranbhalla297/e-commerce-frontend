import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { addTocart } from "../actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { Row, Col, ListGroup, Card, Button, Container } from "react-bootstrap";
import Comments from "./Comments";
import RelatedProducts from "../pages/RelatedProducts";
//import PostComment from "../components/PostComment";
function ProductDetail() {
  const [productdetail, setproductDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [showmore, setShowMore] = useState(false);
  const [quantity, setQuantity] = useState(1);
  // const [itemShow, setitemShow] = useState(200);
  var token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
  const location = useLocation();
  console.log(location);
  var search = location.search;
  console.log(search);
  var ProductId = search.substring(4);
  console.log(ProductId);
  const cartlist = useSelector((state) => state.products);
  console.log(cartlist);
  const dispatch = useDispatch();
  const getProductDetailsById = async () => {
    setLoading(true);
    var search = location.search;
    console.log(search);
    var ProductId = search.substring(4);
    console.log(ProductId);
    var apiurl = `http://localhost:5000/product/product/${ProductId}`;
    let response = await fetch(apiurl);
    if (response.ok) {
      const json = await response.json();
      console.log(json.product);
      setproductDetails(json.product);
      setLoading(false);
    }
  };

  const productAddtocart = async () => {
    var search = location.search;
    console.log(search);
    var ProductId = search.substring(4);
    console.log(ProductId);
    const addProducttocart = {
      productname: productdetail.name,
      quantity: quantity,
      price: productdetail.price,
      productid: ProductId,
      image: productdetail.image,
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
    console.log(data.itemsinCart);
    dispatch(addTocart(data));
  };
  const productAddtoFacv = async () => {
    var search = location.search;
    console.log(search);
    var ProductId = search.substring(4);
    console.log(ProductId);
    const addProducttofav = {
      productname: productdetail.name,
      price: productdetail.price,
      productid: ProductId,
      image: productdetail.image,
    };
    const response = await fetch("http://localhost:5000/favItem/favItem", {
      method: "POST",
      body: JSON.stringify(addProducttofav),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-auth-token": token,
      },
    });

    const data = await response.json();
    console.log(data);
  };
  console.log(productdetail);
  useEffect(() => {
    getProductDetailsById();
    //console.log(itemShow);
  }, [ProductId]);

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
  const showMore = () => {
    setShowMore(!showmore);
  };

  const QuantityChange = (e) => {
    console.log(e.target.value);
    setQuantity(e.target.value);
  };

  return (
    <Container>
      <div className="productDetail_container">
        <Link className="btn btn-light my-3" to="/">
          Go Back
        </Link>
        {loading ? (
          <div>
            <h2>loading.....</h2>
          </div>
        ) : null}
        <Row>
          <Col md={6}>
            <img
              src={productdetail.image}
              style={{
                width: "600px",
                height: "600px",
              }}
            />
          </Col>
          <Col md={3}>
            <Card style={{ border: "none", boxShadow: "none" }}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>{productdetail.name}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>Price : ₹{productdetail.price}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div
                    className={showmore ? "ShowMoreContent" : "ShowLessContent"}
                  >
                    Description : {productdetail.description}
                  </div>

                  <p onClick={showMore} style={{ cursor: "pointer" }}>
                    {showmore ? "show less" : "show more"}
                  </p>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div className="quantityContainer">
                    <label style={{ marginTop: "5px" }}>Quantity:</label>
                    <select
                      className="selectBox"
                      onChange={QuantityChange}
                      value={quantity}
                    >
                      {selectQuantity()}
                    </select>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>Price :₹{productdetail.price}</p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    style={{ backgroundColor: "#6c757d" }}
                    onClick={productAddtocart}
                  >
                    <Link to="/cart"> Add To Cart</Link>
                  </Button>

                  <Button
                    className="btn-block"
                    type="button"
                    style={{ backgroundColor: "#6c757d" }}
                    onClick={productAddtoFacv}
                  >
                    <Link> Add To Favourites</Link>
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <div className="second_row">
          <Row>
            <Col>
              <h3> Review this product</h3>
              <p>Share your thoughts with other customers</p>
              <Button
                variant="secondary"
                className="postBtn"
                style={{ border: "none" }}
              >
                <Link to={`/postComment?id=${productdetail._id}`}>
                  Write a product review
                </Link>
              </Button>
            </Col>
            <Col>
              <h3>Top reviews from India</h3>
              <Comments productid={productdetail._id} />
            </Col>
          </Row>
        </div>
        <div className="second_row">
          <RelatedProducts
            CategoryID={productdetail.categoryId}
            ProductID={productdetail._id}
          />
        </div>
      </div>
    </Container>
  );
}

export default connect()(ProductDetail);
