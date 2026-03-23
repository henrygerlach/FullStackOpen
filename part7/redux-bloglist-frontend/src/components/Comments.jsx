import { useState } from "react";
import { Button, Card, Form, InputGroup, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { commentBlog } from "../reducers/blogsReducer";

const Comments = ({ id, comments }) => {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const handleComment = (event) => {
    event.preventDefault();

    dispatch(commentBlog(id, comment));
    setComment("");
  };

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <h3 className="h5 mb-3">Comments</h3>
        <Form onSubmit={handleComment}>
          <InputGroup className="mb-3">
            <Form.Control
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Write a comment"
            />
            <Button type={"submit"} variant="outline-info">
              Add comment
            </Button>
          </InputGroup>
        </Form>
        <ListGroup variant="flush">
          {comments.map((comment, i) => (
            <ListGroup.Item key={i} className="px-0">
              {comment}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default Comments;
