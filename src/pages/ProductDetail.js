import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { addTocart } from "../actions/cartActions";
import { addFavitems, remove } from "../actions/favActions";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { BASE_URL } from "../Variables";
import {
  FaHeart,
  FaRegHeart,
  FaAngleUp,
  FaSearchPlus,
  FaSearchMinus,
  FaOpencart,
  FaShoppingCart,
} from "react-icons/fa";
import { Row, Col, ListGroup, Card, Button, Container } from "react-bootstrap";
import Comments from "./Comments";
import Ratings from "../components/Ratings";
import RelatedProducts from "../pages/RelatedProducts";
import { FaAngleDown } from "react-icons/fa";
import ImageZoom from "./ImageZoom";

//import PostComment from "../components/PostComment";
function ProductDetail({ handleShow, handleClose, show }) {
  const [productdetail, setproductDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [showmore, setShowMore] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [fav, setfav] = useState(false);
  const reviewlist = useSelector((state) => state.review);
  console.log(reviewlist);
  // const [itemShow, setitemShow] = useState(200);
  var token = JSON.parse(localStorage.getItem("token"));
  const userinfo = useSelector((state) => state.userInfo);
  //var userID = userinfo.user.user.id;
  //console.log(token);
  const location = useLocation();
  //console.log(location);
  var search = location.search;
  //console.log(search);
  var ProductId = search.substring(4);
  console.log(ProductId);
  const cartlist = useSelector((state) => state.products);
  //console.log(cartlist);
  const favItemlist = useSelector((state) => state.favitem);
  console.log(favItemlist);
  console.log(productdetail);
  const dispatch = useDispatch();
  const getProductDetailsById = async () => {
    setLoading(true);
    var search = location.search;
    //console.log(search);
    var ProductId = search.substring(4);
    //console.log(ProductId);
    var apiurl = `${BASE_URL}/product/product/${ProductId}`;
    let response = await fetch(apiurl);
    if (response.ok) {
      const json = await response.json();
      //console.log(json.product);
      setproductDetails(json.product);
      setLoading(false);
    } else {
      setLoading(false);
      console.log(response);
    }
  };

  const productAddtocart = async () => {
    var search = location.search;
    //console.log(search);
    var ProductId = search.substring(4);
    //console.log(ProductId);
    const addProducttocart = {
      productname: productdetail.name,
      quantity: quantity,
      price: productdetail.price,
      productid: ProductId,
      image: productdetail.image,
    };
    const response = await fetch(`${BASE_URL}/cartItem/cartItem`, {
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

  const togglefavStatus = async () => {
    var search = location.search;
    //console.log(search);
    var ProductId = search.substring(4);
    // console.log(ProductId);
    const addProducttofav = {
      productname: productdetail.name,
      price: productdetail.price,
      productid: ProductId,
      image: productdetail.image,
      isFav: !fav,
    };
    //console.log(addProducttofav);
    const response = await fetch(`${BASE_URL}/favItem/add`, {
      method: "POST",
      body: JSON.stringify(addProducttofav),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-auth-token": token,
      },
    });

    const data = await response.json();
    // console.log(data.data);
    if (addProducttofav.isFav) {
      dispatch(addFavitems(data.data));
    } else {
      dispatch(remove(ProductId));
    }
    setfav(!fav);
  };

  const getfavProducts = async () => {
    const response = await fetch(
      `${BASE_URL}/favItem/isFavorite/${ProductId}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-auth-token": token,
        },
      }
    );
    const data = await response.json();
    console.log("---------------------- kfklds ------------");
    console.log(data);
    console.log(data.isFav);
    setfav(data.isFav);
  };
  // console.log(productdetail);
  useEffect(() => {
    getProductDetailsById();
    console.log("useeffect called");
    getfavProducts();

    //console.log(itemShow);
  }, [ProductId]);

  /* const selectQuantity = () => {
    var arr = [];

    for (let i = 1; i <= 20; i++) {
      arr.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return arr;
  };*/
  const showMore = () => {
    setShowMore(!showmore);
  };

  const QuantityChange = (e) => {
    console.log(e.target.value);
    setQuantity(e.target.value);
  };

  return (
    <Container>
      {productdetail && (
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
            <Col md={6} sm={3}>
              <div onClick={handleShow}>
                <img
                  src={productdetail.image}
                  alt={productdetail.image}
                  className="product_image"
                />
              </div>
              <div>
                <ImageZoom
                  handleClose={handleClose}
                  show={show}
                  productdetail={productdetail}
                />
              </div>
            </Col>
            <Col md={3}>
              <Card style={{ border: "none", boxShadow: "none" }}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h4 className="productDetail_Heading">
                      {productdetail.name}
                    </h4>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Ratings rating={productdetail.rating} />
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <p>Price : ₹{productdetail.price}</p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div
                      className={
                        showmore ? "ShowMoreContent" : "ShowLessContent"
                      }
                    >
                      <p className="description">
                        {" "}
                        Description : {productdetail.description}
                      </p>
                    </div>

                    <p onClick={showMore} style={{ cursor: "pointer" }}>
                      {showmore ? (
                        <div style={{ marginTop: "10px" }}>
                          <h6>
                            show less <FaAngleUp />
                          </h6>
                        </div>
                      ) : (
                        <div style={{ marginTop: "10px" }}>
                          <h6>
                            show more <FaAngleDown />
                          </h6>
                        </div>
                      )}
                    </p>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col className="productCardQty">
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <p>
                      Price :
                      <span style={{ marginLeft: "30px" }}>
                        ₹{productdetail.price}
                      </span>
                    </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <p>
                      Status :
                      <span style={{ marginLeft: "25px" }}>
                        {productdetail.countInStock > 0
                          ? "In Stock"
                          : "out of stock"}
                      </span>
                    </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="quantityContainer">
                      <label style={{ marginTop: "5px" }}>Qty:</label>

                      <span style={{ marginLeft: "30px" }}>
                        <select
                          className="selectBox"
                          onChange={QuantityChange}
                          value={quantity}
                        >
                          {[...Array(productdetail.countInStock).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </select>
                      </span>
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      onClick={productAddtocart}
                    >
                      <Link
                        to="/cart"
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        {" "}
                        <FaShoppingCart size="20px" />
                        <span style={{ marginLeft: "10px" }}>Add To Cart</span>
                      </Link>
                    </Button>

                    <Button
                      className="btn-block"
                      type="button"
                      onClick={togglefavStatus}
                    >
                      {fav ? (
                        <FaHeart style={{ color: "red" }} />
                      ) : (
                        <FaRegHeart size="25px" />
                      )}
                      <span style={{ marginLeft: "10px" }}>
                        Add To Favourites
                      </span>
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <hr />
          <div className="second_row">
            <Row>
              <Col sm={6}>
                <div className="writeReview_col">
                  <h3 className="Review_heading"> Review this product</h3>
                  <p>Share your thoughts with other customers</p>
                  <Button
                    variant="secondary"
                    className="postBtn"
                    style={{ border: "none" }}
                  >
                    <Link to={`/postComment?id=${productdetail._id}`}>
                      Please sign in to write a review
                    </Link>
                  </Button>
                </div>
              </Col>
              <hr />
              <Col sm={6}>
                <div className="review_col">
                  <h3 className="review_heading">Top reviews from India</h3>
                  {reviewlist.length == 0 ? (
                    <p> no review</p>
                  ) : (
                    <Comments productid={productdetail._id} />
                  )}
                </div>
              </Col>
              <hr />
            </Row>
          </div>
          <div className="Third_row">
            <RelatedProducts
              CategoryID={productdetail.categoryId}
              ProductID={productdetail._id}
            />
          </div>
        </div>
      )}
      {!productdetail && <span>Loading..</span>}
    </Container>
  );
}

export default connect()(ProductDetail);
