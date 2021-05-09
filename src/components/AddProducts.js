import React, { useState, useEffect } from "react";
//import { NavbarBrand } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_URL } from "../Variables";
//import ReactStars from "react-rating-stars-component";

function AddProducts({ handleClose, show }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [productoption, setProductOption] = useState([]);
  const [SelecteCategory, setSelecteCategory] = useState("");

  async function addProduct() {
    const addProduct = {
      name: name,
      price: price,
      description: description,
      rating: rating,
      categoryId: SelecteCategory,
      countInStock: stock,
      brand: brand,
    };
    const response = await fetch(`${BASE_URL}/product/product`, {
      method: "POST",
      body: JSON.stringify(addProduct),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await response.json();
    console.log(data);
  }

  const onSubmitClick = () => {
    setName(name);
    setPrice(price);
    setDescription(description);
    setRating(rating);
    setCategory(category);
    setStock(stock);
    setBrand(brand);
    addProduct();
    console.log(
      `${name} ${price} ${description} ${rating} ${category} ${stock} ${brand}`
    );
  };

  useEffect(() => {
    fetchproductId();
  }, []);

  //product id
  const fetchproductId = async () => {
    var apiurl = `${BASE_URL}/category/category`;
    let response = await fetch(apiurl);
    if (response.ok) {
      const data = await response.json();
      setProductOption(data.allCategory);
      console.log(productoption);
    }
  };

  const getSelectedvalue = (e) => {
    var selectvalue = e.target.value;
    setSelecteCategory(selectvalue);
    console.log(selectvalue);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <h2>Add Product</h2>
          <div>
            <select value={SelecteCategory} onChange={getSelectedvalue}>
              {productoption.map((option) => (
                <option value={option._id} key={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div className="addProduct_container">
            <div className="product_input">
              <input
                type="text"
                placeholder="product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="product_input">
              <input
                type="number"
                placeholder="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="product_input">
              <input
                type="text"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="product_input">
              <input
                type="text"
                placeholder="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div className="product_input">
              <input
                type="text"
                placeholder="categoryId"
                value={SelecteCategory}
                onChange={(e) => setCategory(SelecteCategory)}
              />
            </div>
            <div className="product_input">
              <input
                type="text"
                placeholder="countInStock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="product_input">
              <input
                type="text"
                placeholder="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div>
            <Button className="btn btn-light my-3" onClick={onSubmitClick}>
              Submit
            </Button>
            <Link
              className="btn btn-light my-3"
              to="/products"
              onClick={handleClose}
            >
              close
            </Link>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProducts;
