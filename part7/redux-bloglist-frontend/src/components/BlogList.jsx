import { ListGroup } from "react-bootstrap";

import BlogListEntry from "./BlogListEntry";
import CreateBlogToggleable from "./CreateBlogToggleable";

const BlogList = ({ blogs, toggleCreateBlogRef }) => {
  return (
    <div className="d-grid gap-3">
      <CreateBlogToggleable toggleCreateBlogRef={toggleCreateBlogRef} />
      <ListGroup className="blog-list shadow-sm rounded-4 overflow-hidden">
        {blogs.map((blog) => (
          <BlogListEntry key={blog.id} blog={blog} />
        ))}
      </ListGroup>
    </div>
  );
};

export default BlogList;
