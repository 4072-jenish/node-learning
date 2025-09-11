const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String
});
0 
module.exports = mongoose.model("Category", categorySchema);
