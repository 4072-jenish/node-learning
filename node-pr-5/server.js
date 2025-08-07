const express = require('express');
const path = require('path');
const app = express();
const database = require('./config/mongoConenction');
const { router } = require('./routes/movieRoutes'); 

const port = 8808;
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


database();

app.use('/', router);

app.listen(port, () => {
    

    
});
