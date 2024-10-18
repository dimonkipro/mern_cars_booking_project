import React, { useEffect } from "react";
import "./bookingUser.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllInvoices } from "../../redux/Actions/actionsInvoice";

function BookingUser() {
  const { invoices, loading, errors } = useSelector(
    (state) => state.invoiceReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllInvoices());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (errors) {
    return <p>Error loading invoices: {errors.message}</p>;
  }

  return (
    <div className="ProductUserr">
      <h2 style={{ textAlign: "center", padding: "1rem" }}>My Bookings</h2>
      <hr />
      {invoices.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <ul className="ulb">
          {invoices.map((el) => (
            <ul key={el._id}>
              <li key={el._id} className="flx_li li">
                <div className="invoiceDetails">
                  <p> 
                    <strong>Car Name:</strong> {el.carName}
                  </p>
                  <p>
                    <strong>Booking Start:</strong> {el.bookingStartDate}
                  </p>
                  <p>
                    <strong>Booking End:</strong> {el.bookingEndDate}
                  </p>
                  <p>
                    <strong>Total Price:</strong> {el.totalPrice}
                  </p>
                </div>
                <div className="carimgb">
                  <img src={el.carImage} alt="..." />
                </div>
              </li>

              <hr />
            </ul>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookingUser;
