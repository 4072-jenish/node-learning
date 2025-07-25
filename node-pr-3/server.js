const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index',);
});
app.get('/index.ejs', (req, res) => {
    res.render('index');
});
app.get('/chart.ejs', (req, res) => {
    res.render('chart');
});
app.get('/form-basic.ejs', (req, res) => {
    res.render('form-basic');
});
app.get('/authantication-login.ejs', (req, res) => {
    res.render('authantication-login');
});
app.get('/table.ejs', (req, res) => {
    res.render('table');
});
app.get('/authantication-register.ejs', (req, res) => {
    res.render('authantication-register');
});


app.listen(8000, () => {
    console.log('Server is running at http://localhost:8000');
});
