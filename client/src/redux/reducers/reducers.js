import {
  GET_PRODUCT_LOADING,
  GET_PRODUCT_SUCCESS,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  GET_PRODUCT_FAIL,
  GET_ONEPRODUCT_SUCCESS,
  GET_ONEPRODUCT_FAIL,
  EDIT_PRODUCT_SUCCESS,
  SEARCHPRDT,
  DELETE_ONEPRODUCT_SUCCESS,
} from "../Const/constProduct ";
import {
  SAVE_INVOICE_LOADING,
  SAVE_INVOICE_SUCCESS,
  SAVE_INVOICE_FAIL,
  GET_INVOICES_FAIL,
  GET_INVOICES_SUCCESS,
  GET_INVOICES_LOADING,
} from "../Const/constInvoice";

const initialState = {
  products: [],
  oneProduct: {},
  invoice: {},
  invoices: [],
  errors: null,
  loading: false,
  addLoading: false,
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCT_LOADING:
      return { ...state, loading: true };
    case GET_PRODUCT_SUCCESS:
      return { ...state, products: payload, loading: false };
    case GET_PRODUCT_FAIL:
      return { ...state, errors: payload, loading: false };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, payload.product],
        addLoading: false,
      };
    case ADD_PRODUCT_FAIL:
      return { ...state, errors: payload };
    case GET_ONEPRODUCT_SUCCESS:
      return { ...state, oneProduct: payload };
    case GET_ONEPRODUCT_FAIL:
      return { ...state, errors: payload };
    case EDIT_PRODUCT_SUCCESS:
      return { ...state };
    case SEARCHPRDT:
      return {
        ...state,
        products: state.products.filter((el) =>
          el.name.toLowerCase().includes(payload.trim().toLowerCase())
        ),
      };

    case DELETE_ONEPRODUCT_SUCCESS:
      return { ...state };
    default:
      return state;
  }
};

export const invoiceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_INVOICE_LOADING:
      return { ...state, loading: true };

    case SAVE_INVOICE_SUCCESS:
      return { ...state, invoice: payload, loading: false };

    case SAVE_INVOICE_FAIL:
      return { ...state, errors: payload, loading: false };
    case GET_INVOICES_LOADING:
      return { ...state, loading: true };
    case GET_INVOICES_SUCCESS:
      return { ...state, invoices: payload, loading: false };
    case GET_INVOICES_FAIL:
      return { ...state, errors: payload, loading: false };
    default:
      return state;
  }
};
