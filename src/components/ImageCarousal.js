import React, { useState, useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
//import SimpleImageSlider from "react-simple-image-slider";
//import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import BannerImage from "../components/BannerImage";
function ImageCarousal() {
  const [image, setImage] = useState([]);
  const fetchData = async () => {
    //console.log("fetch data : ", categoryId);
    var apiurl = "http://localhost:5000/banner/productbanner";
    let response = await fetch(apiurl, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
    });
    if (response.ok) {
      const json = await response.json();
      console.log(json.data);
      setImage(json.data);
    } else {
      // console.log("fetch error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Carousel pause="hover" className="carousal">
        {image.map((imagelist) => (
          <Carousel.Item key={imagelist._id}>
            <Link to={`/imagelistDetails?id=${imagelist._id}`}>
              <div className="carousalImage-container">
                <Image
                  src={imagelist.image}
                  alt={imagelist.image}
                  className="carousalImage"
                />
              </div>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageCarousal;
