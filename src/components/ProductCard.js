import React from "react";
import { Card } from "react-bootstrap";
import Ratings from "./Ratings";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="main_card">
      <Card style={{ width: "18rem", height: "540px" }}>
        <Card.Img variant="top" src={product.image} style={{ height: "60%" }} />
        <Card.Body>
          <Card.Title>
            <Link to={`/productDetails?id=${product._id}`}>{product.name}</Link>
          </Card.Title>
          <Card.Title>₹ {product.price}</Card.Title>
          <Card.Title> {product.brand}</Card.Title>
          <Card.Title>
            <Ratings rating={product.rating} />
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}
