import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getProducts } from "../actions/productActions";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { Row, Col } from "react-bootstrap";
import ImageCarousal from "./ImageCarousal";
import { setlist } from "../actions/cartActions";
import { getuserLoginDetails } from "../actions/userActions";
import { BASE_URL } from "../Variables";
//import ProductCarousel from "../pages/ProductCarousel";
function Home() {
  console.log(BASE_URL);
  let history = useHistory();
  const [productoption, setProductOption] = useState([]);
  const [selecteCategory, setSelecteCategory] = useState("");
  const [sortedValue, setSortedValue] = useState("");
  const productList = useSelector((state) => state.products);

  //console.log(productList);
  const userinfo = useSelector((state) => state.userInfo);
  var token = JSON.parse(localStorage.getItem("token"));
  //console.log(userinfo);
  const dispatch = useDispatch();
  //const BASE_URL = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    getCartList();
    getCategoryList();
    fetchData("", "createdAt");
    getUserdetail();
    console.log(BASE_URL);
  }, []);

  async function getUserdetail() {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    //converting to json
    if (!response.ok) {
      const error = await response.json();
      console.log(error);
    } else {
      const data = await response.json();
      console.log(data);
      dispatch(getuserLoginDetails(data));

      //save userInfo in localstorage
    }
  }

  const getCartList = async () => {
    var apiurl = `${BASE_URL}/cartItem/cartItems`;
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
      console.log(json.cartitems);
      dispatch(setlist(json.cartitems));
    } else {
      // console.log("fetch error");
    }
  };

  const fetchData = async (categoryId, sortBy) => {
    //console.log("fetch data : ", categoryId);
    var apiurl = `${BASE_URL}/product/products`;

    let response = await fetch(apiurl, {
      method: "POST",
      //send request to server
      body: JSON.stringify({
        categoryId: categoryId,
        sortBy: sortBy,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
    });
    if (response.ok) {
      const json = await response.json();
      //console.log(json.products);
      dispatch(getProducts(json.products));
    } else {
      // console.log("fetch error");
    }
  };
  const getCategoryList = async () => {
    var apiurl = `${BASE_URL}/category/category`;
    let response = await fetch(apiurl);

    if (response.ok) {
      const data = await response.json();
      setProductOption(data.allCategory);
      //console.log(productoption);
    }
  };
  //get category id on click
  const getSelectedvalue = (e) => {
    var selectvalue = e.target.value;
    //  console.log("on option selected ", selectvalue);
    setSelecteCategory(selectvalue);
    fetchData(selectvalue);
    setTimeout(() => {}, 1000);
  };

  const sortOnclick = (e) => {
    var selectvalue = e.target.value;
    //console.log("on option selected ", selectvalue);
    setSortedValue(selectvalue);
    //console.log(sortedValue);
    fetchData(selecteCategory, selectvalue);
  };
  const onPriceClick = (e) => {
    console.log(e.target.value);
  };

  return (
    <div>
      <div className="home_page">
        <div className="main-home_page">
          <div>
            <div className="Carousal_container">
              <ImageCarousal />
            </div>
            <Row>
              <Col>
                <div className="main_row">
                  <Row>
                    <Col>
                      <div className="latestProduct_heading">
                        <h3>Latest products</h3>
                      </div>
                    </Col>
                    <Col>
                      <div className="select_main">
                        <div className="select_option">
                          <select
                            onChange={getSelectedvalue}
                            className="options"
                          >
                            <option value="">All</option>
                            {productoption.map((option) => (
                              <option value={option._id} key={option._id}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="Sort_option">
                          <select onChange={sortOnclick} className="options">
                            <option value=""> Featured</option>
                            <option value="createdAt">Newest Arrival</option>
                            <option value="price">Price: High to Low</option>
                            <option value="price-low">
                              Price: Low to High
                            </option>
                            <option value="rating">Rating: Rating</option>
                          </select>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>

                {/*<h1>{selecteCategory}</h1>*/}

                <div className="card-component">
                  {productList.map((product, id) => {
                    return (
                      <div className="card-wrapper" key={id}>
                        <ProductCard product={product} />
                      </div>
                    );
                  })}
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect()(Home);
