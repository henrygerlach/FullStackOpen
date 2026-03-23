import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogListEntry = ({ blog }) => {
  return (
    <ListGroup.Item className="blog-list-item px-3 py-3">
      <Link className="blog-link fw-semibold" to={`/blogs/${blog.id}`}>
        {blog.title}
      </Link>
    </ListGroup.Item>
  );
};

export default BlogListEntry;
