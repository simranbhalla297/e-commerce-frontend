import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { addTocart } from "../actions/cartActions";
import { addFavitems } from "../actions/favActions";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Row, Col, ListGroup, Card, Button, Container } from "react-bootstrap";
import Comments from "./Comments";
import Ratings from "../components/Ratings";
import RelatedProducts from "../pages/RelatedProducts";
//import PostComment from "../components/PostComment";
function ProductDetail() {
  const [productdetail, setproductDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [showmore, setShowMore] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [fav, setfav] = useState(false);
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
    var apiurl = `http://localhost:5000/product/product/${ProductId}`;
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
      isFav: !fav,
    };
    const response = await fetch("http://localhost:5000/favItem/add", {
      method: "POST",
      body: JSON.stringify(addProducttofav),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-auth-token": token,
      },
    });
    const data = await response.json();
    console.log(data.Favitems);
    dispatch(addFavitems(data.Favitems));
    setfav(!fav);
  };

  const getfavProducts = async () => {
    const response = await fetch(
      `http://localhost:5000/favItem/isFavorite/${ProductId}`,
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
            <img
              src={productdetail.image}
              alt={productdetail.image}
              className="product_image"
            />
          </Col>
          <Col md={3}>
            <Card style={{ border: "none", boxShadow: "none" }}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>{productdetail.name}</h4>
                  <Ratings rating={productdetail.rating} />
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
                  <p>Price :₹{productdetail.price}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>
                    Status :
                    {productdetail.countInStock > 0
                      ? "In Stock"
                      : "out of stock"}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="quantityContainer">
                    <label style={{ marginTop: "5px" }}>Qty:</label>
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
                  </div>
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
                    {fav ? (
                      <FaHeart style={{ color: "red" }} />
                    ) : (
                      <FaRegHeart />
                    )}
                    Add To Favourites
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <div className="second_row">
          <Row>
            <Col sm={6}>
              <div className="writeReview_col">
                <h3> Review this product</h3>
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

            <Col sm={6}>
              <div className="review_col">
                <h3>Top reviews from India</h3>
                <Comments productid={productdetail._id} />
              </div>
            </Col>
          </Row>
        </div>
        <div className="Third_row">
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
