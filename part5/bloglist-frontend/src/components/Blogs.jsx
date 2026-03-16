import Blog from "./Blog";

const Blogs = ({
  user,
  blogs,
  handleLogout,
  title,
  setTitle,
  url,
  setURL,
  author,
  setAuthor,
  createBlog,
}) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
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
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
