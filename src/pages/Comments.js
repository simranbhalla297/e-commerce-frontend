import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getReviews } from "../actions/reviewActions";
import { connect } from "react-redux";
import Review from "../pages/Review";
function Comments({ productid }) {
  // console.log(productid);
  const dispatch = useDispatch();
  const reviewlist = useSelector((state) => state.review);
  //console.log(reviewlist);
  const fetchAllReviews = async (productid) => {
    // console.log("fetch data : ", productid);
    dispatch(getReviews([]));

    var apiurl = "http://localhost:5000/review/reviews";
    let response = await fetch(apiurl, {
      method: "POST",
      //send request to server
      body: JSON.stringify({
        productId: productid,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
    });
    if (response.ok) {
      const json = await response.json();
      //  console.log(json);
      dispatch(getReviews(json.review));
    } else {
      // console.log("fetch error");
    }
  };
  useEffect(() => {
    fetchAllReviews(productid);
  }, [productid]); //
  return (
    <div>
      <div>
        {reviewlist.map((list) => {
          return (
            <div className="comment_box">
              <Review review={list} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default connect()(Comments);
