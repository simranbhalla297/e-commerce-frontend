import React from "react";
import Ratings from "../components/Ratings";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
function Review({ review }) {
  return (
    <div>
      <div className="reviews_screen">
        <div>
          <p1>{review.name}</p1>
        </div>
        <div>
          <Ratings rating={review.rating} />
        </div>
        <div>
          <p>{review.comment}</p>
        </div>
        <p>Is it helpful?</p>
        <div className="icon">
          <div>
            <FaRegThumbsUp />
          </div>
          <div style={{ marginLeft: "10px" }}>
            <FaRegThumbsDown />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
