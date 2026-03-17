import Blog from "./Blog";

const BlogList = ({ blogs, reloadBlogs, user }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} reloadBlogs={reloadBlogs} user={user} />
      ))}
    </div>
  );
};

export default BlogList;
