const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const upload = require("../utils/multer");
const isAuth = require("../middlewares/isAuth");
const isCompany = require("../middlewares/isCompany");


//get all products 
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("seller");

    return res.send(products);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

//add new product => private for company
router.post(
  "/",
  upload("products").single("file"),
  isAuth(),
  isCompany,
  async (req, res) => {
    try {
      console.log(req.file);
      const url = `${req.protocol}://${req.get("host")}/${req.file.path}`;
      const newProduct = new Product(req.body);
      console.log(url);
      newProduct.img = url;
      await newProduct.save();
      return res.send({ msg: "product  add succes", product: newProduct });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error.message);
    }
  }
);

//get one product => private for authenticated user
router.get("/:id", isAuth(), async (req, res) => {
  try {
    const oneproduct = await Product.findById(req.params.id).populate("seller");
    return res.send({ product: oneproduct });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//edit product => private for company
router.put(
  "/:id",
  upload("products").single("file"),
  isAuth(),
  isCompany,
  async (req, res) => {
    try {
      const result = await Product.updateOne(
        { _id: req.params.id },
        { ...req.body }
      );
      productUpdated = await Product.findOne({ _id: req.params.id });
      if (req.file) {
        const url = `${req.protocol}://${req.get("host")}/${req.file.path}`;
        productUpdated.img = url;
        await productUpdated.save();
      }
      if (result.modifiedCount || req.file) {
        return res.send({ msg: "update suuccess", product: productUpdated });
      }
      res.status(400).send({ msg: " aleardy update " });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }
);

//delete product => private for company
router.delete("/:id", isAuth(), isCompany, async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    if (result.deletedCount) {
      return res.send({ msg: "delete  success" });
    }
    res.status(400).send({ msg: "aleardy delete" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

module.exports = router;
