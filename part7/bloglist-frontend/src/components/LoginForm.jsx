import { login, useUserDispatch } from "../context/userContext";
import userService from "../services/users";
import { useNavigate } from "react-router-dom";
import {
  notifyError,
  useNotificationDispatch,
} from "../context/notificationContext";
import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const dispatchUser = useUserDispatch();
  const dispatchNotification = useNotificationDispatch();
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      const user = await userService.login(username, password);
      dispatchUser(login(user));
      navigate("/");
    } catch (err) {
      if (err.code === "NetworkError") {
        dispatchNotification(notifyError(err.message), 5000);
      } else {
        dispatchNotification(notifyError("An Unknown Error Occurred."), 5000);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(e.target.username.value, e.target.password.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="usernameFormLogin">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" required name="username" placeholder="Enter username" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="passwordFormLogin">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" required name="password" placeholder="Enter Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
