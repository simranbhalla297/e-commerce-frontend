import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { addTocart } from "../actions/cartActions";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import Comments from "./Comments";
//import PostComment from "../components/PostComment";
function ProductDetail() {
  const [productdetail, setproductDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  console.log(location);
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
    var apiurl = `http://localhost:5000/product/product/${ProductId}`;
    let response = await fetch(apiurl);
    if (response.ok) {
      const json = await response.json();
      console.log(json.product);
      dispatch(addTocart(json.product, ProductId));
    }
  };
  console.log(productdetail);
  useEffect(() => {
    getProductDetailsById();
  }, []);

  return (
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
          <Card style={{ border: "none" }}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{productdetail.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>Price : Rs{productdetail.price}</ListGroup.Item>
              <ListGroup.Item>
                Description : {productdetail.description}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Price : Rs{productdetail.price}</h3>
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
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3> Review this product</h3>
          <p>Share your thoughts with other customers</p>
          <Button>
            <Link to="/postComment">Write a product review</Link>
          </Button>
        </Col>
        <Col>
          <h2>Customer reviews</h2>
          <Comments />
        </Col>
      </Row>
    </div>
  );
}

export default connect()(ProductDetail);
