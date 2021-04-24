import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFavlist } from "../actions/favActions";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Favitem from "./Favitem";
function Favourites() {
  const userinfo = useSelector((state) => state.userInfo);
  const favitemlist = useSelector((state) => state.favitem);
  console.log(favitemlist);
  // var userID = userinfo.user.user.id;
  var token = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const getfavProducts = async () => {
    const response = await fetch("http://localhost:5000/favItem/favItem", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-auth-token": token,
      },
    });
    const data = await response.json();
    console.log(data.allFavitems);
    dispatch(setFavlist(data.allFavitems));
  };

  useEffect(() => {
    getfavProducts();
  }, []);
  return (
    <div className="fav_main">
      <h2>fav products</h2>

      <div className="fav_main-Container">
        {favitemlist.map((item) => {
          return (
            <div>
              <Favitem data={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default connect()(Favourites);
