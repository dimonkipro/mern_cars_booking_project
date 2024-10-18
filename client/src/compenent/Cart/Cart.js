import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./cart.css";
import { saveInvoice } from "../../redux/Actions/actionsInvoice";

const CartPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.invoiceReducer);
  const userr = useSelector((state) => state.userReducer.User);
  const location = useLocation();
  const navigate = useNavigate();

  const { product, bookingDates, user, seller } = location.state;

  const startDate = new Date(bookingDates.start);
  const endDate = new Date(bookingDates.end);
  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const discount = totalDays > 30 ? 0.2 : totalDays > 5 ? 0.1 : 0;
  const pricePerDay = product.price;
  const totalPrice = totalDays * pricePerDay;
  const finalPrice = totalPrice - totalPrice * discount;

  const handlePrintAndSave = () => {
    const invoiceData = {
      userId: userr._id,
      sellerId: seller.sellerId,
      userName: user.userName,
      userEmail: user.email,
      userDlnumber: user.dlnumber,
      carImage: product.img,
      carName: product.name,
      carPlate: product.plate,
      pricePerDay,
      bookingStartDate: bookingDates.start,
      bookingEndDate: bookingDates.end,
      totalDays,
      totalPrice: finalPrice.toFixed(2),
    };

    dispatch(saveInvoice(invoiceData, navigate));
    window.print();
  };

  return (
    <div className="invoice" id="invoice">
      <h1 className="titlein">Invoice</h1>
      <div className="invoice-p">
        <h2 style={{ textDecoration: "underline", color: "#ff9900" }}>
          Client Details{" "}
        </h2>
        <p>
          <strong className="text-invoice">Name: </strong> {user.userName}
        </p>
        <p>
          <strong className="text-invoice">Email: </strong> {user.email}
        </p>
        <p>
          <strong className="text-invoice">Driving license number: </strong>{" "}
          {user.dlnumber}
        </p>
        <hr />
        <h2 style={{ textDecoration: "underline", color: "#ff9900" }}>
          Booking Details{" "}
        </h2>
        <p>
          <strong className="text-invoice">Car: </strong> {product.name}
        </p>
        <p>
          <strong className="text-invoice">Plate: </strong> {product.plate}
        </p>
        <p>
          <strong className="text-invoice">Price: </strong> {pricePerDay} $/day
        </p>
        <p>
          <strong className="text-invoice">Start Date: </strong>{" "}
          {bookingDates.start}
        </p>
        <p>
          <strong className="text-invoice">End Date: </strong>{" "}
          {bookingDates.end}
        </p>
        <p>
          <strong className="text-invoice">Total Days: </strong> {totalDays}
        </p>

        {discount > 0 && (
          <>
            <p style={{ color: "green" }}>
              {discount === 0.2
                ? "A 20% discount has been applied for rentals longer than 30 days."
                : "A 10% discount has been applied for rentals longer than 5 days."}
            </p>
            <hr />
            <p className="totalin">
              <strong className="text-invoice">Sub-Total:</strong>{" "}
              <span>{totalPrice.toFixed(2)} $</span>
            </p>
          </>
        )}
        <p className="totalin">
          <strong className="text-invoice">Discount: </strong>{" "}
          <span>{(discount * totalPrice).toFixed(2)} $</span>
        </p>
        <p className="totalin">
          <strong className="text-invoice " style={{ fontSize: "1.5rem" }}>
            Total :
          </strong>
          <span className="total-invoice ">{finalPrice.toFixed(2)} $</span>
        </p>

        <button className="btn" onClick={handlePrintAndSave} disabled={loading}>
          {loading ? "Saving..." : "Confirm & Print"}
        </button>
      </div>
    </div>
  );
};

export default CartPage;
