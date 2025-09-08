const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog", 
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },
    name: {
      type: String,
      required: true, 
      default: "Anonymous"
    },
     comments: [
    {
      user: String,
      comment: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Comment", commentSchema);
