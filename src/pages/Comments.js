import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getReviews } from "../actions/reviewActions";
import { connect } from "react-redux";
import Review from "../pages/Review";
import { BASE_URL } from "../Variables";
function Comments({ productid }) {
  // console.log(productid);
  const dispatch = useDispatch();
  const reviewlist = useSelector((state) => state.review);
  //console.log(reviewlist);
  const fetchAllReviews = async (productid, sortBy) => {
    // console.log("fetch data : ", productid);
    dispatch(getReviews([]));

    var apiurl = `${BASE_URL}/review/reviews`;
    let response = await fetch(apiurl, {
      method: "POST",
      //send request to server
      body: JSON.stringify({
        productId: productid,
        sortBy: sortBy,
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
  const sortOnclick = (e) => {
    var selectvalue = e.target.value;
    fetchAllReviews(productid, selectvalue);
  };
  return (
    <div>
      <div className="reviewSelect">
        <select onChange={sortOnclick}>
          <option value="AllReviews">All reviews</option>
          <option value="TopReviews">Top reviews</option>
          <option value="LatestReviews">Most recent</option>
        </select>
      </div>

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
