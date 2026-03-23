import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
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
    <Card className="login-card mx-auto border-0 shadow">
      <Card.Body className="p-4 p-md-5">
        <h2 className="h4 mb-4">Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="info" className="w-100 fw-semibold">
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LoginForm;
