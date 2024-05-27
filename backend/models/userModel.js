const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: ["seller", "buyer"],
    },
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: [true, "E-mail is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("users", userSchema);
