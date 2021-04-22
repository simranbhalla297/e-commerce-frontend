import React from "react";
import { Carousel, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function ImageCarousal() {
  const productList = useSelector((state) => state.products);
  console.log(productList);
  return (
    <div>
      <Carousel pause="hover" className="carousal">
        {productList.map((product) => (
          <Carousel.Item key={product._id} style={{ padding: "20px" }}>
            <Link to={`/productDetails?id=${product._id}`}>
              <Image
                src={product.image}
                alt={product.name}
                style={{ width: "17%", borderRadius: "50%" }}
              />
              <Carousel.Caption>
                <h3>
                  {product.name} (₹{product.price})
                </h3>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageCarousal;
