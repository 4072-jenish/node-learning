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
  cast: {
    type: [String], 
    default: []
  },
  genre: {
    type: [String],
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 10
  },
  duration: {
    type: Number, 
    required: true
  },
  language: {
    type: String,
    default: 'English'
  },
  posterUrl: {
    type: String
  },
  description: {
    type: String
  },
  trailerUrl: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Movie', movieSchema);
