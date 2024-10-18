import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/Actions/actionUser";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import Alert from "../Alert/Alert";

function Signup() {
  const [newemail, setemail] = useState("");
  const [newname, setname] = useState("");
  const [newdlnumber, setdlnumber] = useState("");
  const [newpassword, setpassword] = useState("");
  const [newrole, setrole] = useState("user");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addUser(
        {
          email: newemail,
          name: newname,
          dlnumber: newdlnumber,
          password: newpassword,
          role: newrole,
        },
        navigate
      )
    );
  };

  const err = useSelector((state) => state.userReducer.errors);
  return (
    <>
      <SideBar />
      <div id="backH">
        <form id="frsig">
          <h3>Create Account</h3>
          <label htmlFor="email">Email</label>
          <input
            type="Email"
            onChange={(e) => setemail(e.target.value)}
            placeholder="Email "
            id="email"
            autoComplete="on"
          />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            onChange={(e) => setname(e.target.value)}
            placeholder="username"
            id="username"
            autoComplete="on"
          />
          <label htmlFor="dlnumber">Driving license number</label>
          <input
            type="text"
            onChange={(e) => setdlnumber(e.target.value)}
            placeholder="dl number"
            id="dlnumber"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Password"
            id="password"
          />
          <label htmlFor="role">Who are you ?</label>
          <select id="role"
            onChange={(e) => setrole(e.target.value)}
            defaultValue={"user"}
          >
            <option>user</option>
            <option>company</option>
          </select>
          <button onClick={onSubmit} id="b">
            register
          </button>
          {err ? <Alert /> : null}
        </form>
      </div>
    </>
  );
}

export default Signup;
