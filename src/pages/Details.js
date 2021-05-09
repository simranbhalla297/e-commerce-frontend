import React, { useState, useEffect } from "react";
import Popover from "react-bootstrap/Tooltip";
import Ratings from "../components/Ratings";
import { Link } from "react-router-dom";
import { BASE_URL } from "../Variables";
function Details({ data }) {
  const [productdetail, setproductDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const getProductDetailsById = async () => {
    setLoading(true);

    var apiurl = `${BASE_URL}/product/product/${data.productid}`;
    let response = await fetch(apiurl);
    if (response.ok) {
      const json = await response.json();
      console.log(json.product);
      setproductDetails(json.product);
      setLoading(false);
    } else {
      setLoading(false);
      console.log(response);
    }
  };
  // console.log(data);
  useEffect(() => {
    getProductDetailsById();
  }, []);

  return (
    <div>
      <div>
        <p>
          <Ratings rating={productdetail.rating} />{" "}
          <span>{productdetail.rating} out of 5</span>
        </p>
      </div>
      <div>
        <Link
          to="/productDetails"
          style={{ textDecoration: "none", color: "black" }}
        >
          See all customers reviews
        </Link>{" "}
      </div>
    </div>
  );
}

export default Details;
