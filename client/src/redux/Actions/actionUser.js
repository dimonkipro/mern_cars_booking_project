import axios from "axios";
import {
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  EDIT,
  EDIT_FAIL,
  GET_ALLUSERS_FAIL,
  GET_ALLUSERS_SUCCESS,
  GET_CURRENT_FAIL,
  GET_CURRENT_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  naviagte,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAIL,
} from "../Const/constUser";

export const addUser = (userBody, navigate) => async (dispatch) => {
  try {
    const resUser = await axios.post(
      "http://localhost:5000/api/user/register",
      userBody
    );
    dispatch({
      type: ADD_USER_SUCCESS,
      payload: resUser.data,
    });
    navigate("/verify-email");
  } catch (err) {
    console.log(err);
    dispatch({
      type: ADD_USER_FAIL,
      payload: err.response.data,
    });
  }
};

export const loginUser = (loginUser, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/user/login",
      loginUser
    );
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    navigate("/products");
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data,
    });
  }
};

export const verifyEmail = (verificationCode, navigate) => async (dispatch) => {
  dispatch({ type: VERIFY_EMAIL_REQUEST });

  try {
    const response = await axios.post(
      "http://localhost:5000/api/user/verify-email",
      {
        code: verificationCode,
      }
    );
    dispatch({ type: VERIFY_EMAIL_SUCCESS, payload: response.data });
    alert("Email verified successfully");
    navigate("/login")
  } catch (error) {
    dispatch({ type: VERIFY_EMAIL_FAIL, payload: error.response.data.message });
    alert("Wrong verification token or expired !!!");
    navigate("/verify-email")
  }
};

//private
export const getCurrent = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get("http://localhost:5000/api/user/current", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: GET_CURRENT_SUCCESS, payload: res.data });
    // console.log(res.data);
  } catch (error) {
    dispatch({ type: GET_CURRENT_FAIL, payload: error });
  }
};

export const logout = () => {
  return { type: LOGOUT };
};

export const editUser = (id, userBody, navigate) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    const resUser = await axios.put(
      `http://localhost:5000/api/user/${id}`,
      userBody,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(resUser);
    dispatch({
      type: EDIT,
      payload: resUser.data,
    });
    navigate("/profile");
  } catch (err) {
    console.log(err);
    dispatch({
      type: EDIT_FAIL,
      payload: err.response.data,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  console.log("Token is : " + token);

  try {
    const res = await axios.get("http://localhost:5000/api/user/admin", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: GET_ALLUSERS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ALLUSERS_FAIL,
      payload: err.message,
    });
  }
};

export const Navigate = () => {
  return { type: naviagte };
};
