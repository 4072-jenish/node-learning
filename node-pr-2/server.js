const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let todos = [
    { title: 'Buy Groceries', content: 'Milk, Bread, Eggs' },
    { title: 'Study', content: 'Read Express.js documentation' },
    { title: 'Exercise', content: '30-minute run in the evening' }
];

app.get('/', (req, res) => {
    res.render('index', { todos });
});

app.post('/add', (req, res) => {
    const { title, content } = req.body;
    if (title && content) {
        todos.push({ title, content });
    }
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const index = req.body.index;
    if (index !== undefined) {
        todos.splice(index, 1);
    }
    res.redirect('/');
});

app.get('/edit/:index', (req, res) => {
    const index = req.params.index;
    const todo = todos[index];
    if (todo) {
        res.render('edit', { index, todo });
    } else {
        res.redirect('/');
    }
});

app.post('/edit', (req, res) => {
    const { index, title, content } = req.body;
    if (todos[index]) {
        todos[index].title = title;
        todos[index].content = content;
    }
    res.redirect('/');
});

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});
