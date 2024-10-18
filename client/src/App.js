import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProduct } from "./redux/Actions/actionsProduct";
import Signup from "./compenent/signup/Signup";
import { Routes, Route } from "react-router-dom";
import Home from "./compenent/Home/Home";

import Login from "./compenent/Login/Login";
import { getCurrent } from "./redux/Actions/actionUser";
import EditProduct from "./compenent/EditProduct/EditProduct";
import Addproduct from "./compenent/Addproduct/Addproduct";
import Dashboard from "./compenent/Dashboard/Dashboard";
import PrivateRoute from "./compenent/Routes/PrivateRoute";
import Settings from "./compenent/Settings/Settings";
import CompanyRoute from "./compenent/Routes/CompanyRoute";
import AdminRoute from "./compenent/Routes/AdminRoute";
import DashboardAdmin from "./compenent/DashboardAdmin/DashboardAdmin";
import PrivateHome from "./compenent/PrivateHome/PrivateHome";
import Product from "./compenent/Product/product";
import Booking from "./compenent/Booking/booking";
import Footer from "./compenent/Footer/Footer";
import EmailVerificationPage from "./compenent/EmailVerificationPage/EmailVerificationPage";
import SideBar from "./compenent/SideBar/SideBar";
import Line from "./compenent/ChartLine/ChartLine";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getCurrent());
  }, [dispatch]);

  return (
    <>
      <SideBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <PrivateHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profileSettings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Booking />
            </PrivateRoute>
          }
        />
        <Route
          path="/addproduct"
          element={
            <CompanyRoute>
              <Addproduct />
            </CompanyRoute>
          }
        />
        <Route
          path={"/editproduct/:id"}
          element={
            <CompanyRoute>
              <EditProduct />
            </CompanyRoute>
          }
        />
        <Route path={"/charts"} element={<Line />} />
        
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <DashboardAdmin />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
