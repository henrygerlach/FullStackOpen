import { Badge, Button, Card } from "react-bootstrap";

import Comments from "./Comments";
import useLikeBlog from "../hooks/useLikeBlog";

const Blog = ({ blog }) => {
  if (!blog) return null;

  const likeBlog = useLikeBlog(blog);

  return (
    <div className="d-grid gap-3">
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <h2 className="h4 mb-2">{blog.title}</h2>
          <Card.Link href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </Card.Link>
          <div className="mt-3 d-flex align-items-center gap-2">
            <Badge bg="secondary" className="likes-pill">
              {blog.likes} likes
            </Badge>
            <Button size="sm" variant="info" onClick={likeBlog.like}>
              Like
            </Button>
          </div>
          <p className="mt-3 mb-0 text-secondary">added by {blog.user.name}</p>
        </Card.Body>
      </Card>
      <Comments id={blog.id} comments={blog.comments} />
    </div>
  );
};

export default Blog;
