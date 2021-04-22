import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Register from "./components/layout/Register";
import Login from "./components/layout/Login";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import { Route, Switch } from "react-router-dom";

import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./components/Profile";
import Image from "./components/Image";
import CartScreen from "./components/CartScreen";
import AddCategory from "./pages/AddCategory";
import AddProducts from "./components/AddProducts";
import PostComment from "./components/PostComment";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { setlist } from "./actions/cartActions";
import Products from "./pages/Products";
import ProductUpdate from "./pages/ProductUpdate";

//import { useDispatch } from "react-redux";
import { getuserLoginDetails } from "./actions/userActions";
function App() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  var token = JSON.parse(localStorage.getItem("token"));
  // console.log(token);
  useEffect(() => {
    getDatafromLocalSTorage();
  }, []);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  async function getDatafromLocalSTorage() {
    var user = JSON.parse(localStorage.getItem("userInfo"));
    var token = JSON.parse(localStorage.getItem("token"));

    var userData = {
      user,
      token,
    };
    dispatch(getuserLoginDetails(userData));
  }

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <NavBar />
          <Home />
          <Footer />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/productDetails">
          <NavBar />
          <ProductDetail />
          <Footer />
        </Route>
        <Route exact path="/addProducts">
          <NavBar />
          <AddProducts
            handleClose={handleClose}
            show={show}
            handleShow={handleShow}
          />
          <Footer />
        </Route>
        <Route exact path="/products">
          <NavBar />
          <Products
            handleClose={handleClose}
            show={show}
            handleShow={handleShow}
          />
          <Footer />
        </Route>
        <Route exact path="/productUpdate">
          <ProductUpdate
            handleClose={handleClose}
            show={show}
            handleShow={handleShow}
          />
        </Route>
        <Route exact path="/profile">
          <NavBar />
          <Profile />
          <Footer />
        </Route>
        <Route exact path="/img">
          <NavBar />
          <Image />
          <Footer />
        </Route>
        <Route exact path="/cart">
          <NavBar />
          <CartScreen />
          <Footer />
        </Route>
        <Route exact path="/category">
          <NavBar />
          <AddCategory />
          <Footer />
        </Route>
        <Route exact path="/postComment">
          <NavBar />
          <PostComment />
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}

export default connect()(App);
