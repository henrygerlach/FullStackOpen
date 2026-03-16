import Blog from "./Blog";

const BlogList = ({ blogs, removeBlog }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} removeBlog={removeBlog} />
      ))}
    </div>
  );
};

export default BlogList;
