const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  director: {
    type: String,
    required: true
  },
  genre: {
    type: [String], 
    default: ''
  },
  releaseDate: {
    type: Date 
  },
  duration: {
    type: Number 
  },
  description: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 10
  },
  seats: {
  type: [String],
  default: []
},
  language: {
    type: String,
    default: 'English'
  },
  poster: {
    type: String 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Movie', movieSchema);
