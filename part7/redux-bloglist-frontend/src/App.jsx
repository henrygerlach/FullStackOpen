import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useMatch } from "react-router-dom";

import "./index.css";
import Blog from "./components/Blog";
import BlogList from "./components/BlogList";
import Header from "./components/Header";
import LoginForm from "./components/Login";
import Notification from "./components/Notification";
import User from "./components/User";
import Users from "./components/Users";
import { initBlogs } from "./reducers/blogsReducer";
import { changeUser } from "./reducers/userReducer";
import { initUsers } from "./reducers/usersReducer";

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);

  const usersIdMatch = useMatch("/users/:id");
  const userInfo = usersIdMatch
    ? users.find((user) => user.id === usersIdMatch.params.id)
    : null;

  const blogsIdMatch = useMatch("/blogs/:id");
  const blogInfo = blogsIdMatch
    ? blogs.find((blog) => blog.id === blogsIdMatch.params.id)
    : null;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(changeUser(user));
    }

    dispatch(initUsers());
    dispatch(initBlogs());
  }, []);

  const toggleCreateBlogRef = useRef();

  return (
    <div className="container">
      <Notification />
      {!user && <LoginForm />}
      {user && (
        <div>
          <Header user={user} />
          <Routes>
            <Route
              path={"/"}
              element={
                <BlogList
                  user={user}
                  blogs={blogs}
                  toggleCreateBlogRef={toggleCreateBlogRef}
                />
              }
            />
            <Route path={"/blogs/:id"} element={<Blog blog={blogInfo} />} />
            <Route path={"/users"} element={<Users users={users} />} />
            <Route path={"/users/:id"} element={<User user={userInfo} />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
