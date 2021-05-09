import React, { useState, useEffect } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getProducts, removeProduct } from "../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../Variables";
//import ProductUpdate from "../pages/ProductUpdate";
function Products({ handleShow }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);

  const fetchData = async () => {
    //console.log("fetch data : ", categoryId);
    var apiurl = `${BASE_URL}/product/products`;
    let response = await fetch(apiurl, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.products);
      dispatch(getProducts(data.products));
    } else {
      console.log("fetch error");
    }
  };

  console.log("fetch error");
  const onRemoveClick = (id) => {
    console.log("remove");
    console.log(id);
    removeProductfromList(id);
  };

  const removeProductfromList = async (id) => {
    var apiurl = `http://localhost:5000/product/product/${id}`;
    let response = await fetch(apiurl, {
      method: "DELETE",
    });
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      dispatch(removeProduct(id));
    } else {
      console.log("fetch error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="Product_container">
        <Row className="align-items-center ">
          <Col>
            <h4 className="products_heading">Products</h4>
          </Col>
          <Col className="text-right">
            <Button className="my-3 bg-dark" onClick={handleShow}>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to="/addProducts"
              >
                <FaPlus /> Create Product
              </Link>
            </Button>
          </Col>
        </Row>
        <div>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>CATEGORY ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>BRAND</th>

                <th>UPDATE & REMOVE</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => {
                return (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.categoryId}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.brand}</td>
                    <td>
                      <Button className="bg-dark mr-2" onClick={handleShow}>
                        <Link to={`/productUpdate?id=${product._id}`}>
                          Update
                        </Link>
                      </Button>

                      <Button
                        className="bg-dark"
                        onClick={() => onRemoveClick(product._id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Products;
