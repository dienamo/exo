import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/signup", { email, password })
      .then((user) => console.log(user).catch((err) => console.log(err)));
  };

  return (
    <div>
      <form>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confirm Password"
        />

        <button type="submit" onClick={handleSignup}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
