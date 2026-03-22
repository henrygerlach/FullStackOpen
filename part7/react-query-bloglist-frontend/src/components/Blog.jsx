import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import blogService from "../services/blogs";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, user }) => {
  const [showExtended, setShowExtended] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const queryClient = useQueryClient();

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

  const likeMutation = useMutation({
    mutationFn: handleLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

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
      <button onClick={likeMutation.mutate}>like</button>
      <br />
      {blog.author}
      {blog.user.username === user.username ? (
        <div>
          <br />
          <button onClick={deleteMutation.mutate}>delete</button>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
