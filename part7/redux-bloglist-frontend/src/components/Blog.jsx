import Comments from "./Comments";
import useLikeBlog from "../hooks/useLikeBlog";

const Blog = ({ blog }) => {
  if (!blog) return null;

  const likeBlog = useLikeBlog(blog);

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br></br>
      {blog.likes} likes <button onClick={likeBlog.like}>like</button>
      <br></br>
      added by {blog.user.name}
      <Comments id={blog.id} comments={blog.comments} />
    </div>
  );
};

export default Blog;
