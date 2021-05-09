import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import { BASE_URL } from "../Variables";
function PostComment() {
  const [rating, setRating] = useState();
  const [username, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [productid, setProductid] = useState("");
  const location = useLocation();
  // console.log(location);
  var search = location.search;
  let history = useHistory();
  // console.log(history);
  // console.log(search);
  var ProductId = search.substring(4);
  // console.log(ProductId);
  var user = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(user);
  var token = JSON.parse(localStorage.getItem("token"));
  // console.log(token);

  const submitHandler = (e) => {
    e.preventDefault();
    setRating(rating);
    setComment(comment);
    setUserName(username);
    // console.log(comment);
    // console.log(rating);
    //console.log(username);
    postComment();
  };
  useEffect(() => {
    if (!user) {
      history.push("/login");
    } else {
      var userData = JSON.parse(localStorage.getItem("userInfo"));
      var userName = userData.name;
      setProductid(ProductId);
      setUserName(userName);
    }
  }, []);
  const postComment = () => {
    const updateduserDetail = {
      name: username,
      rating: rating,
      comment: comment,
      productId: productid,
    };
    fetch(`${BASE_URL}/review/review`, {
      method: "POST",
      body: JSON.stringify(updateduserDetail),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-auth-token": token,
      },
    }).then((res) => {
      alert("data changed");
    });
  };
  //get reviews

  return (
    <div>
      <h2>Create Review</h2>
      <Form>
        <Form.Group>
          <Form.Label>user name</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Add A written review</Form.Label>
          <Form.Control
            type="text"
            value={comment}
            placeholder="what dis you like or dislike?"
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Overall rating</Form.Label>
          <Form.Control
            type="Number"
            value={rating}
            placeholder="Rating"
            onChange={(e) => setRating(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Product Id</Form.Label>
          <Form.Control
            type="text"
            value={productid}
            placeholder="product id"
            onChange={(e) => setProductid(e.target.value)}
          />
        </Form.Group>

        <Button
          type="submit"
          style={{ backgroundColor: "#6c757d" }}
          onClick={submitHandler}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default PostComment;
