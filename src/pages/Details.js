import React, { useState, useEffect } from "react";
import Ratings from "../components/Ratings";
function Details({ data }) {
  const [productdetail, setproductDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const getProductDetailsById = async () => {
    setLoading(true);

    var apiurl = `http://localhost:5000/product/product/${data.productid}`;
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
      <Ratings rating={productdetail.rating} />
      <p>{productdetail.price}</p>
    </div>
  );
}

export default Details;
