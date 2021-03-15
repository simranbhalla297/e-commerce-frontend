import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import SearchBox from "./SearchBox";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function NavBar() {
  let history = useHistory();
  console.log(history);
  const onBtnclik = () => {
    var dataRemove = localStorage.removeItem("userInfo");
    console.log(dataRemove);
    if (dataRemove) {
      history.push("/login");
    }
  };
  const userinfo = useSelector((state) => state.userInfo);
  console.log(userinfo);
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">ProShop</Navbar.Brand>
        <SearchBox />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <NavLink to="/cart">
              <FaShoppingCart />
              Cart
            </NavLink>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/register">Sign IN</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/login">Log IN</NavLink>
            <NavLink to="/login" onClick={onBtnclik}>
              Log out
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
