import React from "react";
import { Button } from "react-bootstrap";
import { remove } from "../actions/favActions";
import { useSelector, useDispatch } from "react-redux";

export default function Favitem({ data }) {
  //const favitemlist = useSelector((state) => state.favitem);
  //console.log(favitemlist);
  const dispatch = useDispatch();
  var token = JSON.parse(localStorage.getItem("token"));
  //console.log(token);
  const onRemoveClick = (id) => {
    console.log("remove");
    console.log(id);
    removeProductfromfavList(id);
  };
  const removeProductfromfavList = async (id) => {
    var apiurl = `http://localhost:5000/favItem/favItem/${id}`;
    let response = await fetch(apiurl, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-auth-token": token,
      },
    });
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      dispatch(remove(id));
    } else {
      console.log("fetch error");
    }
  };
  return (
    <div className="favitem_container">
      <div className="inner-fav-container">
        <div>
          <img src={data.image} alt={data.image} className="favImage" />
        </div>
        <div className="favText_container">
          <h2>product name:{data.productname}</h2>
        </div>
        <div className="favbtn_container">
          <Button>Add to cart</Button>
          <Button onClick={() => onRemoveClick(data._id)}>Remove</Button>
        </div>
      </div>
    </div>
  );
}
