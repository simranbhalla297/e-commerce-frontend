import React, { useEffect, useState } from "react";

export default function BannerImage() {
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
      <h2>hjgh</h2>jg
    </div>
  );
}
