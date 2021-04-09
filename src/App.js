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

//import ProductCarousel from "./pages/ProductCarousel";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
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
    getCartList();
  }, []);
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
          <AddProducts />
          <Footer />
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
