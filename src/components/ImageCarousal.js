import React from "react";
import { Carousel, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
function ImageCarousal() {
  const productList = useSelector((state) => state.products);
  console.log(productList);
  return (
    <div>
      <Carousel className="carousal">
        {productList.map((product) => (
          <Carousel.Item key={product._id} style={{ padding: "20px" }}>
            <Image
              src={product.image}
              alt={product.name}
              fluid
              style={{ height: "10%", width: "10%" }}
            />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (₹{product.price})
              </h2>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageCarousal;
