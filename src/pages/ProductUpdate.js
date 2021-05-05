import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
//import { updateProduct } from "../actions/productActions";
//import { useHistory } from "react-router-dom";

function ProductUpdate({ handleClose, show }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const location = useLocation();
  //console.log(location);
  var search = location.search;
  //console.log(search);
  var ProductId = search.substring(4);
  console.log(ProductId);

  useEffect(() => {
    const getProductDetailById = async () => {
      console.log(ProductId);

      var apiurl = `http://localhost:5000/product/product/${ProductId}`;
      let response = await fetch(apiurl);
      if (response.ok) {
        const json = await response.json();
        console.log(json.product);
        setName(json.product.name);
        setPrice(json.product.price);
        setBrand(json.product.brand);
        setCountInStock(json.product.countInStock);
        setDescription(json.product.description);
      } else {
        console.log("error");
      }
    };
    getProductDetailById();
  }, []);

  //
  const updateProduct = async () => {
    const updateProduct = {
      name: name,
      price: price,
      brand: brand,
      countInStock: countInStock,
      description: description,
    };
    fetch(`http://localhost:5000/product/product/${ProductId}`, {
      method: "POST",
      body: JSON.stringify(updateProduct),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => {
      alert("data changed");
    });
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <h1>Edit Product</h1>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Product Name :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Product Price: </Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Product brand</Form.Label>
              <Form.Control
                type="email"
                placeholder="Product brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="Number"
                placeholder="Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary" onClick={updateProduct}>
            submit
          </Button>

          <Link
            className="btn btn-light my-3"
            to="/products"
            onClick={handleClose}
          >
            close
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default ProductUpdate;
