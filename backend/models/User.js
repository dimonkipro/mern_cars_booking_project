const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, trim: true, lowercase: true },
  name: { type: String, required: true },
  password: { type: String },
  newpassword: { type: String },
  dlnumber: { type: String, required: true },
  img: { type: String },
  role: { type: String, enum: ["guest", "company", "user", "admin"] },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationTokenExpiresAt: Date,
  failedLoginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date },
});

// Pre-save hook to format the dlnumber
userSchema.pre("save", function (next) {
  if (this.dlnumber && typeof this.dlnumber === "string") {
    const number = this.dlnumber.replace(/\D/g, ""); // Remove non-digit characters
    if (number.length > 2) {
      // Format as xx/xxxxxx where xx are the first two digits
      this.dlnumber = `${number.slice(0, 2)}/${number.slice(2)}`;
    }
  }
  next();
});

const User = mongoose.model("user", userSchema);
module.exports = User;
