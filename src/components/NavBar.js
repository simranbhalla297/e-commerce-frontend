import React, { useEffect } from "react";

import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaRegHeart, FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router";

function NavBar() {
  let history = useHistory();
  const userinfo = useSelector((state) => state.userInfo);
  var user = userinfo.user;
  // console.log(history);
  const onBtnclik = () => {
    var dataRemove = localStorage.removeItem("userInfo");
    //console.log(dataRemove);
    var tokenRemove = localStorage.removeItem("token");
    // console.log(tokenRemove);
    if (dataRemove && tokenRemove) {
      history.push("/login");
    }
  };

  const cartList = useSelector((state) => state.cart);
  // console.log(cartList.length);

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            {" "}
            <NavLink to="/" style={{ textDecoration: "none", color: "#fff" }}>
              ProShop{" "}
            </NavLink>
          </Navbar.Brand>

          <SearchBox />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              {userinfo && user && user.user ? (
                <NavDropdown
                  title={user.user.name}
                  id="username"
                  className="dropdown"
                >
                  <NavDropdown.Item>
                    <NavLink
                      to="/profile"
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      My Profile
                    </NavLink>
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={onBtnclik}>
                    {" "}
                    <NavLink
                      to="/login"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Log out
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavLink to="/login" className="login">
                  Login
                </NavLink>
              )}
              <NavLink
                to="/cart"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  marginTop: "8px",
                }}
              >
                <div style={{ display: "flex" }}>
                  {cartList.length == 0 ? null : <h4>{cartList.length}</h4>}
                  <FaShoppingCart size="30px" color="#fff" /> Cart
                </div>
              </NavLink>
              {userinfo && user && user.user ? (
                <NavLink
                  to="/favProducts"
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    marginTop: "8px",
                  }}
                >
                  <FaRegHeart size="20px" />
                </NavLink>
              ) : null}

              {userinfo && user && user.user && user.user.isAdmin && (
                <NavDropdown title="Admin">
                  <NavDropdown.Item>
                    {" "}
                    <NavLink
                      to="/products"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Products
                    </NavLink>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    {" "}
                    <NavLink
                      to="/category"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Add category
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
