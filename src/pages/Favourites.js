import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFavlist } from "../actions/favActions";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Favitem from "./Favitem";
import { BASE_URL } from "../Variables";
function Favourites() {
  let history = useHistory();
  const user = useSelector((state) => state.userInfo);
  const favitemlist = useSelector((state) => state.favitem);
  console.log(favitemlist);
  // var userID = userinfo.user.user.id;
  var token = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const getfavProducts = async () => {
    const response = await fetch(`${BASE_URL}/favItem/favItem`, {
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
    if (!user) {
      history.push("/login");
    }
    getfavProducts();
  }, []);
  return (
    <div className="fav-main">
      <div className="fav_inner">
        <div className="fav_container">
          <h4 style={{ letterSpacing: "2px", marginBottom: "20px" }}>
            FAVOURITE ITEM LIST
          </h4>

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
      </div>
    </div>
  );
}

export default connect()(Favourites);
