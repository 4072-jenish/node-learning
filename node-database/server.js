const express = require('express');
const database = require('./conections/dbconnection');
const Book = require('./models/book');
const app = express();

database(); // connect to MongoDB

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Show all books
app.get('/', async (req, res) => {
    const books = await Book.find();
    res.render('index', { books });
});

// Add a new book
app.post('/books', async (req, res) => {
    const { title, author, pages, genre, publisher, publishedYear, language, isbn } = req.body;

    await Book.create({
        title,
        author,
        pages,
        genre,
        publisher,
        publishedYear,
        language,
        isbn
    });

    res.redirect('/');
});

// Show the edit form
app.get('/books/edit/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.render('edit', { book });
});

// Update the book
app.post('/books/update/:id', async (req, res) => {
    const { title, author, pages, genre, publisher, publishedYear, language, isbn } = req.body;

    await Book.findByIdAndUpdate(req.params.id, {
        title,
        author,
        pages,
        genre,
        publisher,
        publishedYear,
        language,
        isbn
    });

    res.redirect('/');
});

// Delete a book
app.post('/books/delete/:id', async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.listen(8080, () => {
    console.log('Server is running at http://localhost:8080');
});
