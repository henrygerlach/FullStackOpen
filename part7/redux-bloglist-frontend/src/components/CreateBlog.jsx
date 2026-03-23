import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogsReducer";

const CreateBlog = ({ toggleCreateBlogRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

  const dispatch = useDispatch();

  const handleCreate = async (event) => {
    event.preventDefault();

    const blog = {
      title: title,
      url: url,
      author: author,
    };

    dispatch(createBlog(blog));

    setTitle("");
    setAuthor("");
    setURL("");

    toggleCreateBlogRef.current.toggleVisibility();

    dispatch(
      setNotification(`a new blog ${title} by ${author} added`, "green"),
    );
  };

  return (
    <Card className="border-0 create-blog-card">
      <Card.Body>
        <h3 className="h5 mb-3">Create New</h3>
        <Form onSubmit={handleCreate}>
          <Form.Group className="mb-3" controlId="create-blog-title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="create-blog-url">
            <Form.Label>Url</Form.Label>
            <Form.Control
              value={url}
              onChange={({ target }) => setURL(target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="create-blog-author">
            <Form.Label>Author</Form.Label>
            <Form.Control
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="info" className="fw-semibold">
            Create
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreateBlog;
