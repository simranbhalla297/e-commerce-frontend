import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getProducts } from "../actions/productActions";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";

//import ProductCarousel from "../pages/ProductCarousel";
function Home() {
  let history = useHistory();
  const [productoption, setProductOption] = useState([]);
  const [selecteCategory, setSelecteCategory] = useState("");
  const [sortedValue, setSortedValue] = useState("");
  const productList = useSelector((state) => state.products);
  console.log(productList);
  const userinfo = useSelector((state) => state.userInfo);
  console.log(userinfo);
  const dispatch = useDispatch();

  useEffect(() => {
    getCategoryList();
    fetchData("", "createdAt");
  }, []);

  const fetchData = async (categoryId, sortBy) => {
    console.log("fetch data : ", categoryId);
    var apiurl = "http://localhost:5000/product/products";
    let response = await fetch(apiurl, {
      method: "POST",
      body: JSON.stringify({
        categoryId: categoryId,
        sortBy: sortBy,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
    });
    if (response.ok) {
      const json = await response.json();
      console.log(json.products);
      dispatch(getProducts(json.products));
    } else {
      console.log("fetch error");
    }
  };
  const getCategoryList = async () => {
    var apiurl = "http://localhost:5000/category/category";
    let response = await fetch(apiurl);

    if (response.ok) {
      const data = await response.json();
      setProductOption(data.allCategory);
      console.log(productoption);
    }
  };
  //get category id on click
  const getSelectedvalue = (e) => {
    var selectvalue = e.target.value;
    console.log("on option selected ", selectvalue);
    setSelecteCategory(selectvalue);
    fetchData(selectvalue);
    setTimeout(() => {}, 1000);
  };

  const sortOnclick = (e) => {
    var selectvalue = e.target.value;
    console.log("on option selected ", selectvalue);
    setSortedValue(selectvalue);
    console.log(sortedValue);
    fetchData(selecteCategory, selectvalue);
  };

  return (
    <>
      <div>
        <select onChange={getSelectedvalue}>
          <option value="">All</option>
          {productoption.map((option) => (
            <option value={option._id} key={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select onChange={sortOnclick}>
          <option value="createdAt">sort by latest</option>
          <option value="price">sort by price</option>
          <option value="rating">sort by rating</option>
        </select>
      </div>

      {/*<h1>{selecteCategory}</h1>*/}

      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        {productList.map((product, id) => {
          return (
            <div key={id}>
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default connect()(Home);
