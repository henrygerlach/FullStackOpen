import { useState } from "react";
import { useDispatch } from "react-redux";

import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogsReducer";

const CreateBlog = ({ toggleCreateBlogRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

  const dispatch = useDispatch();

  const handleCreate = async (event) => {
    event.preventDefault();

    const blog = {
      title: title,
      url: url,
      author: author,
    };

    dispatch(createBlog(blog));

    setTitle("");
    setAuthor("");
    setURL("");

    toggleCreateBlogRef.current.toggleVisibility();

    dispatch(
      setNotification(`a new blog ${title} by ${author} added`, "green"),
    );
  };

  return (
    <div>
      <h3>Create New</h3>
      <form onSubmit={handleCreate}>
        <div>
          <label>
            title:
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              value={url}
              onChange={({ target }) => setURL(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
