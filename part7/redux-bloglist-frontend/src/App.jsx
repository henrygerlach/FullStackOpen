import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./index.css";
import BlogList from "./components/BlogList";
import CreateBlog from "./components/CreateBlog";
import LoginForm from "./components/Login";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import loginService from "./services/login";
import { setNotification } from "./reducers/notificationReducer";
import { initBlogs } from "./reducers/blogsReducer";
import { changeUser, revokeUser } from "./reducers/userReducer";

const App = () => {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(changeUser(user));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      dispatch(changeUser(user));
      setUsername("");
      setPassword("");
    } catch {
      dispatch(setNotification("wrong username or password", "red"));
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();

    dispatch(revokeUser());
    window.localStorage.removeItem("user");
  };

  const toggleCreateBlogRef = useRef();

  return (
    <div>
      <Notification />
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
            <CreateBlog toggleCreateBlogRef={toggleCreateBlogRef} />
          </Toggleable>
          <BlogList user={user} />
        </div>
      )}
    </div>
  );
};

export default App;
