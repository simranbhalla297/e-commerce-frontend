import React, { useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import SearchBox from "./SearchBox";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function NavBar() {
  let history = useHistory();
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

  const userinfo = useSelector((state) => state.userInfo);
  console.log(userinfo);
  const cartList = useSelector((state) => state.cart);
  // console.log(cartList.length);

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
            <NavLink to="/cart">
              {cartList.length}
              <FaShoppingCart />
              Cart
            </NavLink>

            {userinfo.user ? (
              <>
                <NavLink to="/profile">
                  Profile{" "}
                  <span style={{ marginLeft: "5px" }}>
                    ({userinfo.user.user.name})
                  </span>
                </NavLink>

                <NavLink to="/login" onClick={onBtnclik}>
                  LogOut
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
              </>
            )}

            {userinfo.user && userinfo.user.user.isAdmin && (
              <>
                <NavLink to="/products"> Products</NavLink>
                <NavLink to="/category">Add category</NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
