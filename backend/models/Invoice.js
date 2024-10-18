const mongoose = require("mongoose");
const User = require("./User");
const invoiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: User },
  userName: { type: String },
  userEmail: { type: String },
  userDlnumber: { type: String },
  carImage: { type: String },
  carName: { type: String },
  carPlate: { type: String },
  pricePerDay: { type: Number },
  bookingStartDate: { type: String },
  bookingEndDate: { type: String },
  totalDays: { type: Number },
  totalPrice: { type: String },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
