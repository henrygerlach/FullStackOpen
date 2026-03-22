import { useState, useEffect, useRef, useReducer } from "react";
import { useQuery } from "@tanstack/react-query";

import "./index.css";
import BlogList from "./components/BlogList";
import CreateBlog from "./components/CreateBlog";
import LoginForm from "./components/Login";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import notificationReducer, {
  initialState as notficationInitialState,
} from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";

const App = () => {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [user, dispatchUser] = useReducer(userReducer, null);
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    notficationInitialState,
  );

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      return await blogService.getAll();
    },
    refetchOnWindowFocus: false,
  });

  let blogs = [];
  if (!result.isLoading) blogs = result.data;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatchUser({ type: "SET", payload: user });
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatchUser({ type: "SET", payload: user });
      setUsername("");
      setPassword("");
    } catch {
      notificationDispatch({
        type: "SET",
        payload: {
          notification: "wrong username or password",
          color: "red",
        },
      });
      setTimeout(() => {
        notificationDispatch({ type: "RESET" });
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();

    dispatchUser({ type: "RESET" });
    window.localStorage.removeItem("user");
  };

  const updateNotification = (message, color = "blue") => {
    notificationDispatch({
      type: "SET",
      payload: {
        notification: message,
        color: color,
      },
    });
    setTimeout(() => {
      notificationDispatch({ type: "RESET" });
    }, 5000);
  };

  const toggleCreateBlogRef = useRef();

  return (
    <div>
      <Notification notification={notification} />
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
            />
          </Toggleable>
          <BlogList blogs={blogs} user={user} />
        </div>
      )}
    </div>
  );
};

export default App;
