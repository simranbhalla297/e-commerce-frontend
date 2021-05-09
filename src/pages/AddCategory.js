import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { BASE_URL } from "../Variables";
function AddCategory() {
  const [addcategory, setAddcategory] = useState("");

  async function addCategory(e) {
    e.preventDefault();
    const category = {
      name: addcategory,
    };
    const response = await fetch(`${BASE_URL}/category/category`, {
      method: "POST",
      body: JSON.stringify(category),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await response.json();
    console.log(data);
    setAddcategory(addcategory);
    console.log(addcategory);
  }
  return (
    <div className="categoryForm">
      <Form>
        <Form.Group>
          <Form.Label>Add Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add product category"
            value={addcategory}
            onChange={(e) => setAddcategory(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={addCategory}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default AddCategory;
