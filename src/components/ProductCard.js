import React from "react";
import { Card, Button } from "react-bootstrap";
import Ratings from "./Ratings";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Title>
            <Ratings rating={product.rating} />
          </Card.Title>
          <Card.Title>Rs {product.price}</Card.Title>
          <Button>
            <Link to={`/productDetails?id=${product._id}`}>Show more</Link>
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
