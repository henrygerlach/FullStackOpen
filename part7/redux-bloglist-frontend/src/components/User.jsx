import { Card, ListGroup } from "react-bootstrap";

const User = ({ user }) => {
  if (!user) return null;

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <h2 className="h4 mb-3">{user.name}</h2>
        <h3 className="h6 text-uppercase text-secondary mb-3">Added Blogs</h3>
      </Card.Body>
      <ListGroup variant="flush">
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default User;
