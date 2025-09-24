const express = require('express');
const router = require('./src/router/index.route'); 
const database = require('./src/config/dbConnection');

database();


const app = express();
app.use('/', router);

const PORT = 8888;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`) )