require('dotenv').config();
const express = require('express');
const app = express();
const database = require('./config/mongoConnect');
const PORT = process.env.PORT || 8000;
database();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', require('./routes/index.route'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`) )  