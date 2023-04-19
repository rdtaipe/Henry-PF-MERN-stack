import React, { useState } from "react";
import axios from "axios";
const BACK_URL = "http://localhost:5000";

const Auth_BORRAR_ = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [register, setRegister] = useState({});

  function handleInputs(type, e) {
    if (type === "login") {
      setLogin({ ...login, [e.name]: e.value });
    }
  }

  function handleSubmit(type, data) {
    console.log(data);
    if (type === "login") {
      axios
        .post(`${BACK_URL}/auth/login`, data)
    }
  }

  return (
    <div>
      <h2>login</h2>
      <div>
        <input
          type="text"
          name="email"
          value={login.email}
          onChange={(e) => handleInputs("login", e.target)}
        />
        <input
          type="password"
          name="password"
          value={login.password}
          onChange={(e) => handleInputs("login", e.target)}
        />
        <button onClick={() => handleSubmit("login", login)}>enter</button>
        <br />
        <a href={`${BACK_URL}/auth/google`}>ingresar con google</a>
      </div>
    </div>
  );
};

export default Auth_BORRAR_;
