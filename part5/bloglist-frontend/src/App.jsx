import "./index.css";
import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import LoginForm from "./components/Login";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [notificationColor, setNotificationColor] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      updateNotification("wrong username or password", "red");
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();

    setUser(null);
    window.localStorage.removeItem("user");
  };

  const createBlog = async (event) => {
    event.preventDefault();

    const blog = {
      title: title,
      url: url,
      author: author,
    };

    await blogService.create(blog);

    updateNotification(`a new blog ${title} by ${author} added`, "green");
  };

  const updateNotification = (message, color = "blue") => {
    setNotification(message);
    setNotificationColor(color);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <div>
      <Notification notification={notification} color={notificationColor} />
      {!user && (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
      {user && (
        <Blogs
          user={user}
          blogs={blogs}
          handleLogout={handleLogout}
          title={title}
          setTitle={setTitle}
          url={url}
          setURL={setURL}
          author={author}
          setAuthor={setAuthor}
          createBlog={createBlog}
        />
      )}
    </div>
  );
};

export default App;
