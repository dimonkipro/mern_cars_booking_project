const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoice");
const isAuth = require("../middlewares/isAuth");
const isCompany = require("../middlewares/isCompany");

// POST route to save an invoice
router.post("/invoices", isAuth(), async (req, res) => {
  try {
    const invoiceData = req.body;

    // Create a new invoice document
    const newInvoice = new Invoice(invoiceData);
 
    // Save the invoice to the database
    await newInvoice.save();

    res.status(201).json({ message: "Invoice saved successfully" });
  } catch (error) {
    console.error("Error saving invoice:", error);
    res.status(500).json({ message: "Error saving invoice" });
  }
});
// Route to get all invoices/bookings for a user
router.get("/invoices",isAuth(), async (req, res) => {
  try {
    const userId = req.user._id;


    // Retrieve all invoices for the user from the database
    const invoices = await Invoice.find({ userId });

    return res.send(invoices);
  } catch (error) {
    console.error("Error getting invoices:", error);
    res.status(500).json({
      message: "Error getting invoices",
      error: error.message,
    });
  }
});

//Get all invoices for Company
router.get("/allInvoices",isAuth(),isCompany, async (req, res) => {
  try {
    const invoices = await Invoice.find();

    return res.send(invoices);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});
module.exports = router; 
