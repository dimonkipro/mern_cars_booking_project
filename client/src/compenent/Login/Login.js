import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/Actions/actionUser";
import Alert from "../Alert/Alert";
import SideBar from "../SideBar/SideBar";
function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email: Email, password: Password }, navigate));
  };

  const err = useSelector((state) => state.userReducer.errors);
  return (
    <>
      <SideBar />
      <div id="login">
        <form id="fr" onSubmit={onSubmit}>
          <h3 style={{ marginTop: "0" }}>Login</h3>
          <label htmlFor="email">email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            id="email" autoComplete="on"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            id="password"
          />
          <button id="b" onClick={onSubmit}>
            Log In
          </button>

          {err ? <Alert /> : null}
        </form>
      </div>
    </>
  );
}

export default Login;
