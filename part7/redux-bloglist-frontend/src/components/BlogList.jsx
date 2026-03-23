import BlogListEntry from "./BlogListEntry";
import CreateBlogToggleable from "./CreateBlogToggleable";

const BlogList = ({ blogs, toggleCreateBlogRef }) => {
  return (
    <div>
      <CreateBlogToggleable toggleCreateBlogRef={toggleCreateBlogRef} />
      {blogs.map((blog) => (
        <BlogListEntry key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
