const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

let todos = [
    { title: 'Buy Groceries', content: 'Milk, Bread, jam', priority: 'One', date: '2025-07-22' },
    { title: 'Study', content: 'Read Express.js documentation', priority: 'Two', date: '2025-07-23' },
    { title: 'Exercise', content: '30-minute run in the evening', priority: 'Three', date: '2025-07-24' }
];

app.get('/', (req, res) => {
    res.render('index', { todos, message: null });
});
app.get('/index.ejs', (req, res) => {
    res.render('index', { todos, message: null });
});
app.get('/chart.ejs', (req, res) => {
    res.render('chart', { todos, message: null });
});
app.get('/form-basic.ejs', (req, res) => {
    res.render('form-basic', { todos, message: null });
});
app.get('/authantication-login.ejs', (req, res) => {
    res.render('authantication-login', { todos, message: null });
});
app.get('/table.ejs', (req, res) => {
    res.render('table', { todos, message: null });
});
app.get('/authantication-register.ejs', (req, res) => {
    res.render('authantication-register', { todos, message: null });
});


app.listen(8000, () => {
    console.log('Server is running at http://localhost:8000');
});
