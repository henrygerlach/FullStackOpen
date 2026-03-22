import { useState } from "react";
import { useDispatch } from "react-redux";

import { updateBlog, removeBlog } from "../reducers/blogsReducer";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, user }) => {
  const [showExtended, setShowExtended] = useState(false);

  const dispatch = useDispatch();

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    dispatch(updateBlog(updatedBlog));
  };

  const handleDelete = async () => {
    if (window.confirm(`Delete ${blog.title} from ${blog.author}?`)) {
      dispatch(removeBlog(blog.id));
    }
  };

  if (!showExtended) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button
          onClick={() => {
            setShowExtended(true);
          }}
        >
          view
        </button>
      </div>
    );
  }
  return (
    <div style={blogStyle}>
      {blog.title}
      <button
        onClick={() => {
          setShowExtended(false);
        }}
      >
        hide
      </button>
      <br />
      {blog.url}
      <br />
      likes: {blog.likes}
      <button onClick={handleLike}>like</button>
      <br />
      {blog.author}
      {blog.user.username === user.username ? (
        <div>
          <br />
          <button onClick={handleDelete}>delete</button>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
