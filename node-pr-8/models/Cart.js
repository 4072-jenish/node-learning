// models/Cart.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      name: String,
      price: Number,
      image: String,
      category: String,
      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
});

module.exports = mongoose.model("Cart", cartSchema);
