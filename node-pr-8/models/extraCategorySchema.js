const mongoose = require("mongoose");

const extraCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String }
});

module.exports = mongoose.model("ExtraCategory", extraCategorySchema);
