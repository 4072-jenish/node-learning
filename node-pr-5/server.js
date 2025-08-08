const express = require('express');
const path = require('path');
const app = express();
const database = require('./config/mongoConenction');
const movieRoutes = require('./routes/movieRoutes');

const port = 8808;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to database
database();

// Serve static uploads folder for images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Redirect home to movies list
app.get('/', (req, res) => res.redirect('/movies'));

// Mount movies routes under /movies
app.use('/movies', movieRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
