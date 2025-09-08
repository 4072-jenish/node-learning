const mongoose = require("mongoose");

const webUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      default: "Guest"
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    avatar: {
      type: String,
      default: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" // default profile pic
    },
    role: {
      type: String,
      enum: ["visitor", "admin"],
      default: "visitor"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("WebUser", webUserSchema);
