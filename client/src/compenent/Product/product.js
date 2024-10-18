import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import "./product.css";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneProduct } from "../../redux/Actions/actionsProduct";

function ShowProduct() {
  const { id } = useParams(); // Get product ID from URL
  const dispatch = useDispatch();
  const todayDate = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-mm-dd format

  const product = useSelector((state) => state.productReducer.oneProduct);
  const user = useSelector((state) => state.userReducer.User); // Assuming user data exists in Redux
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(todayDate);
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getOneProduct(id)); // Fetch the product by ID
    }
  }, [dispatch, id]);

  const handleBooking = () => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-mm-dd format
    // Check if user role is "company"
    if (user?.role === "company") {
      setErrorMessage("Companies are not allowed to make bookings.");
      return;
    } else if (user?.role === "admin") {
      setErrorMessage("Admin not allowed to make bookings.");
      return;
    }

    if (!startDate || !endDate) {
      setErrorMessage("Please select both start and end dates.");
      return;
    }
    if (startDate < today) {
      setErrorMessage("Start date cannot be in the past.");
      return;
    }
    if (endDate <= startDate) {
      setErrorMessage("End date must be after the start date.");
      return;
    }

    // Clear any previous error messages
    setErrorMessage("");

    navigate("/cart", {
      state: {
        product: {
          name: product?.name,
          price: product?.price,
          category: product?.category,
          plate: product?.category,
          img: product?.img,
        },
        bookingDates: {
          start: startDate,
          end: endDate,
        },
        user: {
          userName: user?.name,
          dlnumber: user?.dlnumber,
          email: user?.email,
        },
        seller: {
          sellerId: product?.seller._id,
        },
      },
    });
  };

  return (
    <>
      <SideBar />

      <div className=" row">
        <div className="col-2 car">
          <img src={product?.img} alt={product?.name} />
        </div>
        <div className="col-2">
          <h2 className="text-product1" id="carName">
            {product?.name}
          </h2>
          <h3 className="text-product1">
            ${product?.price} TND /jour
            <p className="para" style={{ lineHeight: "1.5" }}>
              ° 10% Discount is granted for rentals exceeding 5 consecutive days{" "}
              <br />° 20% for rentals exceeding 30 consecutive days
            </p>
          </h3>
          <div className="date">
            <input
              type="date"
              name="startDate"
              id="start-date-input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              name="endDate"
              id="end-date-input"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <div className="button">
            <button onClick={handleBooking} className="btn-book">
              Book Now
            </button>
          </div>
          <h3 className="text-product1">
            Car Details &nbsp;
            <i className="fa fa-indent"></i>
          </h3>
          <p className="para">Category: {product?.category}</p>

          <h4 className="text-product2">Plate Number: {product?.plate}</h4>
        </div>
      </div>
    </>
  );
}

export default ShowProduct;
