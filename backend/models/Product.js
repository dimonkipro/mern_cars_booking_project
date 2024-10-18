const mongoose = require("mongoose");
const User = require("./User");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  plate: { type: String, required: true },
  img: { type: String },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: User },
  category: { type: String, enum: ["luxury", "sport", "regular"] },
});
const Product = mongoose.model("product", productSchema);
module.exports = Product;
