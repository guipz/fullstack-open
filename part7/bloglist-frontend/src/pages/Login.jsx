import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useUserValue } from "../context/userContext";

const Login = () => {
  const userState = useUserValue();

  if (userState) {
    return <Navigate to="/" />;
  }

  return (
    <article>
      <header>
        <h4>Login</h4>
      </header>
      <LoginForm />
    </article>
  );
};

export default Login;
