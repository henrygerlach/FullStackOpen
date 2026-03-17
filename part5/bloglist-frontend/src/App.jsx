import "./index.css";
import { useState, useEffect, useRef } from "react";
import BlogList from "./components/BlogList";
import CreateBlog from "./components/CreateBlog";
import LoginForm from "./components/Login";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [notificationColor, setNotificationColor] = useState("green");

  useEffect(() => {
    reloadBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const reloadBlogs = async () => {
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => b.likes - a.likes);
    setBlogs(blogs);
  };

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

  const updateNotification = (message, color = "blue") => {
    setNotification(message);
    setNotificationColor(color);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const toggleCreateBlogRef = useRef();

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
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Toggleable buttonLabel="create new blog" ref={toggleCreateBlogRef}>
            <CreateBlog
              updateNotification={updateNotification}
              toggleCreateBlogRef={toggleCreateBlogRef}
              reloadBlogs={reloadBlogs}
            />
          </Toggleable>
          <BlogList blogs={blogs} reloadBlogs={reloadBlogs} user={user} />
        </div>
      )}
    </div>
  );
};

export default App;
