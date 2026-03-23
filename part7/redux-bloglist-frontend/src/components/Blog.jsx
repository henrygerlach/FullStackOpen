import { useState } from "react";
import { useDispatch } from "react-redux";

import useLikeBlog from "../hooks/useLikeBlog";
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
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleComment}>
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button type={"submit"}>add comment</button>
      </form>
      <ul>
        {comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

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
