import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
function RelatedProducts({ CategoryID, ProductID }) {
  console.log(CategoryID);
  console.log(ProductID);

  const [products, setProducts] = useState([]);
  const fetchProducts = async (CategoryID) => {
    console.log("fetch data : ", CategoryID);
    var apiurl = "http://localhost:5000/product/products";
    let response = await fetch(apiurl, {
      method: "POST",
      //send request to server
      body: JSON.stringify({
        categoryId: CategoryID,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
    });
    if (response.ok) {
      const json = await response.json();
      console.log(json.products);
      const filterProducts = json.products.filter((x) => x._id !== ProductID);
      setProducts(filterProducts);
    } else {
      console.log("fetch error");
    }
  };
  console.log(products);
  useEffect(() => {
    fetchProducts(CategoryID);
  }, [ProductID]);
  return (
    <div>
      <h2>Related products</h2>
      {products.length == 0 ? (
        "no related products "
      ) : (
        <div style={{ display: "flex" }}>
          {products.map((product) => {
            return (
              <div>
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RelatedProducts;
