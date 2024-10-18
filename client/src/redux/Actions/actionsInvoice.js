import axios from "axios";

import {
  SAVE_INVOICE_LOADING,
  SAVE_INVOICE_SUCCESS,
  SAVE_INVOICE_FAIL,
  GET_INVOICES_FAIL,
  GET_INVOICES_SUCCESS,
  GET_INVOICES_LOADING
} from "../Const/constInvoice";

export const saveInvoice = (invoiceData, navigate) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    dispatch({ type: SAVE_INVOICE_LOADING });

    const res = await axios.post(
      "http://localhost:5000/api/invoices",
      invoiceData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch({
        type: SAVE_INVOICE_SUCCESS,
        payload: res.data,
    });
    
    alert("Booking saved successfully!");
    navigate("/products");
  } catch (err) {
    dispatch({
      type: SAVE_INVOICE_FAIL,
      payload: err.message,
    });

    alert("There was an error saving the invoice. Please try again.");
  }
};

export const getAllInvoices = () => async (dispatch) => {
  dispatch({ type: GET_INVOICES_LOADING });
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get("http://localhost:5000/api/invoices", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: GET_INVOICES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_INVOICES_FAIL, payload: error });
  }
};
// For Company
export const getInvoices = () => async (dispatch) => {
  dispatch({ type: GET_INVOICES_LOADING });
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get("http://localhost:5000/api/allInvoices", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: GET_INVOICES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_INVOICES_FAIL, payload: error });
  }
};

