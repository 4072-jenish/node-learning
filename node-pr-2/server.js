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

app.post('/add', (req, res) => {
    const { title, content, priority, date } = req.body;
    if (title && content && priority && date) {
        todos.push({ title, content, priority, date });
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
    const { index, title, content, priority, date } = req.body;
    if (todos[index]) {
        todos[index].title = title;
        todos[index].content = content;
        todos[index].priority = priority;
        todos[index].date = date;
    }
    res.redirect('/');
});

app.listen(8000, () => {
    console.log('Server is running at http://localhost:8000');
});
