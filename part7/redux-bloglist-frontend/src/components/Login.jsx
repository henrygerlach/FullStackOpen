import { useState } from "react";
import { useDispatch } from "react-redux";

import loginService from "../services/login";
import { setNotification } from "../reducers/notificationReducer";
import { changeUser } from "../reducers/userReducer";

const LoginForm = () => {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("user", JSON.stringify(user));
      dispatch(changeUser(user));
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
      dispatch(setNotification("wrong username or password", "red"));
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
