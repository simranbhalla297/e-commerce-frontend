import React from "react";

import Ratings from "./Ratings";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="main_card">
      <div className="card_container">
        <div className="img_box">
          <Link
            to={`/productDetails?id=${product._id}`}
            className="product_link"
          >
            <img
              src={product.image}
              alt={product.image}
              className="img_container"
            />
          </Link>
        </div>
        <div className="text_container">
          <Link
            to={`/productDetails?id=${product._id}`}
            className="product_link"
          >
            <h6>{product.name}</h6>
          </Link>
          <p className="product_price">₹ {product.price}</p>
          <p className="product_seller">Seller: {product.brand}</p>
          <Ratings rating={product.rating} />
        </div>
      </div>
    </div>
  );
}
