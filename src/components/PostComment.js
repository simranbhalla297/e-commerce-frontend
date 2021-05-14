import React, { useState, useEffect } from "react";
import { Form, Button, Dropdown, DropdownButton } from "react-bootstrap";
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

  const onSelectRating = (e) => {
    var customerRating = e;
    console.log(customerRating);
    setRating(customerRating);
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
    <div style={{ backgroundColor: "red" }}>
      <div className="review_container">
        <div className="review">
          <div className="review_box">
            <h4 className="review_heading">Create Review</h4>
            <div>
              <h5>Overall rating</h5>

              <DropdownButton
                className="dropdown_rating"
                onSelect={onSelectRating}
                title="Select Overall rating"
              >
                <Dropdown.Item eventKey="1">1</Dropdown.Item>
                <Dropdown.Item eventKey="2">2</Dropdown.Item>
                <Dropdown.Item eventKey="3"> 3</Dropdown.Item>
                <Dropdown.Item eventKey="4">4</Dropdown.Item>
                <Dropdown.Item eventKey="5">5</Dropdown.Item>
              </DropdownButton>
              <Form.Group className="rating_field">
                <Form.Control value={rating} placeholder="Rating" />
              </Form.Group>
            </div>

            <hr />
            <Form>
              <Form.Group>
                <Form.Label>Add a written review</Form.Label>
                <Form.Control
                  type="text"
                  value={comment}
                  placeholder="what dis you like or dislike?"
                  onChange={(e) => setComment(e.target.value)}
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

              <Form.Group>
                <Form.Label>user name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="name"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>

              <Button
                className="ReviewSubmit_btn"
                type="submit"
                onClick={submitHandler}
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostComment;
