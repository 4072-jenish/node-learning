const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const router = require('./routes/indexRouters'); 
const database = require('./config/mongoConenction');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

database();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', router);

const PORT = 8088;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
