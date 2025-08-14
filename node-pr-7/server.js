const express = require('express');
const router = require('./routes/indexRouters');
const app = express();
const database = require('./config/mongoConenction');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use(express.json());

app.use('/', router);

database()

app.listen(8000, () => {
    console.log('Server is running at http://localhost:8000');
});
