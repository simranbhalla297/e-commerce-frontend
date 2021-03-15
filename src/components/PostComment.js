import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function PostComment() {
  const [rating, setRating] = useState();
  const [text, setText] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    setRating(rating);
    setText(text);
    console.log(text);
    console.log(rating);
  };
  return (
    <div>
      <h2>Add a Comment</h2>
      <Form>
        <Form.Group>
          <Form.Label>Overall rating</Form.Label>
          <Form.Control
            type="Number"
            placeholder="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Add A written review</Form.Label>
          <Form.Control
            type="text"
            value={text}
            placeholder="what dis you like or dislike?"
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={submitHandler}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default PostComment;
