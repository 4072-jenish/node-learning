const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const router = require('./routes/indexRouters'); 
const database = require('./config/mongoConenction');
// const passport = require('passport');
const session = require('express-session')
// const LocalStrategy = require('./middleware/localStratagy');
const passport = require('./middleware/localStratagy'); 
const flash = require('connect-flash');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(flash());

database();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(session({
    name : "testing",
    secret: "hello",
    saveUninitialized: false,
    resave: true,
    cookie: {
        maxAge: 1000*60*60
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAutheticatUser);

app.use('/', router);

const PORT = 8008;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`) )