import React from "react";
import ReactStars from "react-rating-stars-component";
//import { FaStar, FaStarHalfAlt } from "react-icons/fa";
export default function Ratings({ rating }) {
  console.log(rating, typeof rating);

  return rating ? (
    <div>
      <ReactStars
        count={5}
        size={24}
        value={rating || 0}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
        edit={false}
      />
    </div>
  ) : (
    <></>
  );
}
