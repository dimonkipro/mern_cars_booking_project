import axios from "axios";

import {
  GET_PRODUCT_LOADING,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  ADD_PRODUCT_SUCCESS,
  GET_ONEPRODUCT_SUCCESS,
  GET_ONEPRODUCT_FAIL,
  ADD_PRODUCT_FAIL,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  SEARCHPRDT,
  DELETE_ONEPRODUCT_SUCCESS,
  DELETE_ONEPRODUCT_FAIL,
} from "../Const/constProduct ";


export const getAllProduct = () => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_LOADING });
  try {
    const response = await axios.get("http://localhost:5000/api/product");
    dispatch({ type: GET_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_FAIL, payload: error });
    console.log(error);
  }
};

export const addProduct = (productBody, navigate) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const resProduct = await axios.post(
      "http://localhost:5000/api/product/",
      productBody,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: resProduct.data,
    });
    dispatch(getAllProduct());
    navigate("/products");
  } catch (err) {
    console.log(err);
    dispatch({
      type: ADD_PRODUCT_FAIL,
      payload: err.message,
    });
  }
};

export const searchProduct = (searchPRDT) => {
  return { type: SEARCHPRDT, payload: searchPRDT };
};

export const getOneProduct = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");

  dispatch({
    type: GET_PRODUCT_LOADING,
  });
  try {
    const res = await axios.get(`http://localhost:5000/api/product/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: GET_ONEPRODUCT_SUCCESS,
      payload: res.data.product,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ONEPRODUCT_FAIL,
      payload: err.message,
    });
  }
};

export const editProduct = (id, productBody, navigate) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    const resProduct = await axios.put(
      `http://localhost:5000/api/product/${id}`,
      productBody,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  ;
    dispatch({
      type: EDIT_PRODUCT_SUCCESS,
      payload: resProduct.data.Product,
    });
    dispatch(getAllProduct());
    navigate("/profile");
  } catch (err) {
    console.log(err);
    dispatch({
      type: EDIT_PRODUCT_FAIL,
      payload: err.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`http://localhost:5000/api/product/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: DELETE_ONEPRODUCT_SUCCESS,
    });
    dispatch(getAllProduct());
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_ONEPRODUCT_FAIL,
    });
  }
};

