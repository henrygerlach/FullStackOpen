import { useState } from "react";
import blogService from "../services/blogs";

const CreateBlog = ({ updateNotification, toggleCreateBlogRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");

  const createBlog = async (event) => {
    event.preventDefault();

    const blog = {
      title: title,
      url: url,
      author: author,
    };

    await blogService.create(blog);

    setTitle("");
    setAuthor("");
    setURL("");

    toggleCreateBlogRef.current.toggleVisibility();

    updateNotification(`a new blog ${title} by ${author} added`, "green");
  };

  return (
    <div>
      <h3>Create New</h3>
      <form onSubmit={createBlog}>
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
