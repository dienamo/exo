import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("dienamo");
  const [password, setPassword] = useState("1234");
  const history = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/login",
        { username, password },
        { withCredentials: true }
      )
      .then((user) => {
        history("/");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Email"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        <button type="submit" onClick={handleLogin}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
