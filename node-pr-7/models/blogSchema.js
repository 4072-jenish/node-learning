const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,  // Or you can reference User model using ObjectId
    required: true
  },
  category: {
    type: String,
    enum: ['Technology', 'Lifestyle', 'Education', 'Travel', 'Food', 'Other'],
    default: 'Other'
  },
  tags: {
    type: [String],
    default: []
  },
  image: {
    type: String, // URL of the blog image
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Draft', 'Published'],
    default: 'Draft'
  }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
