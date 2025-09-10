const mongoose = require("mongoose");

const extraCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true }
}, { timestamps: true });

module.exports = mongoose.model("ExtraCategory", extraCategorySchema);
