const express = require('express');
const path = require('path');
const app = express();
const database = require('./config/mongoConenction');
const movieRoutes = require('./routes/movieRoutes');
const seatRoutes = require('./routes/movieRoutes')
const port = 8808;

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

database();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => res.redirect('/movies'));

app.use('/movies', movieRoutes);

app.use('/seats', seatRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
