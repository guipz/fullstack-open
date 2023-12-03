import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../services/library";
import { useEffect } from "react";

const Login = ({ setToken, show }) => {
  const [login, result] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("token", token);
    }
  }, [result.data]);


  if (!show) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      variables: {
        username: e.target.username.value,
        password: e.target.password.value,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Username
        <input name="username" required placeholder="username" />
      </div>
      <div>
        Password
        <input
          name="password"
          required
          type="password"
          placeholder="password"
        />
      </div>
      <button>login</button>
    </form>
  );
};

export default Login;
