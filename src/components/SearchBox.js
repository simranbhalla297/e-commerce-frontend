import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const productList = useSelector((state) => state.products);
  // console.log(productList);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(keyword);
    fetchData(keyword);
    //
  };

  const fetchData = async (keyword) => {
    console.log("fetch data : ", keyword);
    var apiurl = "http://localhost:5000/product/products";
    let response = await fetch(apiurl, {
      method: "POST",
      //send request to server
      body: JSON.stringify({
        categoryId: keyword,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
    });
    if (response.ok) {
      const json = await response.json();
      console.log(json);
    } else {
      console.log("fetch error");
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
      );
    </Form>
  );
};

export default SearchBox;
