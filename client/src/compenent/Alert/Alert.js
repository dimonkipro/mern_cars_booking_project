import React from "react";
import { useSelector } from "react-redux";
import "./alert.css";

function Alert() {
  const err = useSelector((state) => state.userReducer.errors);
  // console.log(err);

  return (
    <>
      {err && err.msg ? (
        <p id="err">{err.msg}</p>
      ) : err && Array.isArray(err.errors) && err.errors.length > 0 ? (
        <p id="err">{err.errors[0].msg}</p>
      ) : err && Array.isArray(err.errors) && err.errors.length > 1 ? (
        <p id="err">{err.errors[1].msg}</p>
      ) : null}
    </>
  );
}

export default Alert;
