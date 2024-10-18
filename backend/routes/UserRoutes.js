const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  registerCheck,
  loginCheck,
  validator,
} = require("../middlewares/Validator");
const isAuth = require("../middlewares/isAuth");
const upload = require("../utils/multer");
const isAdmin = require("../middlewares/isAdmin");
const {
  sendVerificationEmail,
  sendWelcomeEmail,
} = require("../mailtrap/emails");
//register
router.post("/register", registerCheck(), validator, async (req, res) => {
  const { email, password, role } = req.body;
  console.log(req.body);

  try {
    if (role == "admin") {
      return res.status(401).send({ msg: "not auth !!" });
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).send({ msg: "user exist ,please login" });
    }
    const newUser = new User(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    newUser.password = hashedPassword;
    newUser.verificationToken = verificationToken;
    newUser.verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 Hours

    await newUser.save();
    await sendVerificationEmail(newUser.email, verificationToken);
    res.send({ msg: "user added successfuly", user: newUser });
  } catch (error) {
    console.log(error);
    console.error("Error during registration", error);
    res.status(500).send({ msg: "Internal server error during registration" });
  }
});
//Verify email
router.post("/verify-email", async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid or expired verification code",
        });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in verifyEmail ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
const MAX_LOGIN_ATTEMPTS = 3;
const LOCK_TIME = 5 * 60 * 1000; // 5 minutes lock time
//login user
router.post("/login", loginCheck(), validator, async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).send({ msg: "bad credential !!" });
    }

    // Check if the account is locked
    if (existUser.lockUntil && existUser.lockUntil > Date.now()) {
      return res
        .status(403)
        .send({
          msg: "Account is temporarily locked. Please try again after 5 minutes.",
        });
    }

    const isMatched = await bcrypt.compare(password, existUser.password);
    if (!isMatched) {
      // Increment failed login attempts
      existUser.failedLoginAttempts += 1;

      // Lock the account if the maximum number of attempts is reached
      if (existUser.failedLoginAttempts >= MAX_LOGIN_ATTEMPTS) {
        existUser.lockUntil = Date.now() + LOCK_TIME;
      }

      await existUser.save();
      return res.status(400).send({ msg: "bad credential !!" });
    }

    // Reset failed login attempts and lock status on successful login
    existUser.failedLoginAttempts = 0;
    existUser.lockUntil = undefined;
    await existUser.save();

    existUser.password = undefined; // Do not return the password
    const payload = { _id: existUser._id };
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    res.send({ user: existUser, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: error.message });
  }
});
// get current user ==>private
router.get("/current", isAuth(), (req, res) => {
  res.send({ user: req.user });
});
//edituser => private
router.put(
  "/:id",
  upload("user").single("file"),
  isAuth(),
  async (req, res) => {
    const { email, newpassword, password } = req.body;
    try {
      if (newpassword && password) {
        // validator current password
        const existUser = await User.findOne({ email });
        console.log(existUser);
        const isMatched = await bcrypt.compare(password, existUser.password);

        if (isMatched) {
          // bcrypt new password
          const hashednewpassword = await bcrypt.hash(newpassword, 10);
          req.body.password = hashednewpassword;
        } else {
          return res.status(400).send({ msg: "Current password not matched!" });
        }
      }
      const result = await User.updateOne(
        { _id: req.params.id },
        { ...req.body }
      );
      const UserUpdated = await User.findOne({ _id: req.params.id });
      UserUpdated.newpassword = undefined;
      // change photo
      if (req.file) {
        const url = `${req.protocol}://${req.get("host")}/${req.file.path}`;
        UserUpdated.img = url;
        await UserUpdated.save();
      }

      if (result.modifiedCount || req.file || req.password) {
        return res.send({ msg: "update success", user: UserUpdated });
      }
      return res.status(400).send({ msg: " aleardy update " });
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }
);
//userlist=>private for admin
router.get("/admin", isAuth(), isAdmin, async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 });
    res.send(users); // Send response once
  } catch (error) {
    console.log(error);
    if (!res.headersSent) {
      res.status(400).send({ msg: error.message }); // Send error response if not yet sent
    }
  }
});

module.exports = router;
