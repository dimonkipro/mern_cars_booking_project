/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import "./Profil.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductUser from "../ProductUser/ProductUser";
import BookingUser from "../BookingUser/BookingUser";
import img from "./blank-profile-picture-973460_640.webp";
import { getCurrent } from "../../redux/Actions/actionUser";
import { getAllProduct } from "../../redux/Actions/actionsProduct";

function Profile() {
  const user = useSelector((state) => state.userReducer.User);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrent());
    dispatch(getAllProduct());
  }, [dispatch]);

  return (
    <>
      <div className="containerPfrl">
        <div className="flxPrf">
          <h2 className="NamePrf">
            {user && user.name ? <>{user.name.toUpperCase()}</> : "Guest"}
          </h2>
          <h3 className="desc">Profile of {user.role}</h3>
        </div>

        {user.img ? (
          <img className="profImg" src={user.img} alt="profile" />
        ) : (
          <img className="profImg" src={img} alt="profile" />
        )}

        <Link to={"/profileSettings"}>
          <button className="btnSttg">Profile Settings</button>
        </Link>
        
      </div>
      {user.role === "admin" ? null : user.role === "company" ? (
        <ProductUser />
      ) : (
        <BookingUser /> 
      )}
    </>
  );
}

export default Profile;
