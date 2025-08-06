// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    pages: Number,
    genre: String,
    publisher: String,
    publishedYear: Number,
    language: String,
    isbn: String
});

module.exports = mongoose.model('Books', bookSchema);
