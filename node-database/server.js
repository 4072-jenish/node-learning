const express = require('express');
const database= require('./conections/dbconnection');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index');
});

app.listen(8080, () => {
    database;
    console.log('Server is running at http://localhost:8080');
});
