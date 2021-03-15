import React, { useState, useEffect } from "react";
//import { NavbarBrand } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

function AddProducts() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [productoption, setProductOption] = useState([]);
  const [SelecteCategory, setSelecteCategory] = useState("");

  async function addCategory() {
    const addProduct = {
      name: name,
      price: price,
      description: description,
      rating: rating,
      categoryId: SelecteCategory,
      countInStock: stock,
      brand: brand,
    };
    const response = await fetch("http://localhost:5000/product/product", {
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
    addCategory();
    console.log(
      `${name} ${price} ${description} ${rating} ${category} ${stock} ${brand}`
    );
  };

  useEffect(() => {
    fetchproductId();
  }, []);

  //product id
  const fetchproductId = async () => {
    var apiurl = "http://localhost:5000/category/category";
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
      <div>
        <select value={SelecteCategory} onChange={getSelectedvalue}>
          {productoption.map((option) => (
            <option value={option._id} key={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
        }}
      >
        <h2>Add Product</h2>
        <input
          type="text"
          placeholder="product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div>
          <ReactStars
            count={5}
            size={24}
            value={rating}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
        </div>
        <input
          type="text"
          placeholder="categoryId"
          value={SelecteCategory}
          onChange={(e) => setCategory(SelecteCategory)}
        />
        <input
          type="text"
          placeholder="countInStock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <input
          type="text"
          placeholder="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <button onClick={onSubmitClick}> Submit</button>
      </div>
    </>
  );
}

export default AddProducts;
