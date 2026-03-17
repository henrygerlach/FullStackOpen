import { useState } from "react";
import blogService from "../services/blogs";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog }) => {
  const [showExtended, setShowExtended] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: likes + 1,
    };

    await blogService.update(updatedBlog);
    setLikes(updatedBlog.likes);
  };

  const handleDelete = async () => {
    if (window.confirm(`Delete ${blog.title} from ${blog.author}?`)) {
      await blogService._delete(blog);
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
      likes: {likes}
      <button onClick={handleLike}>like</button>
      <br />
      {blog.author}
      <br />
      <button onClick={handleDelete}>delete</button>
    </div>
  );
};

export default Blog;
