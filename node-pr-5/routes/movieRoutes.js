const express = require('express');
const router = express.Router();
const { getMovies } = require('../controller/movieController');

router.get('/', getMovies); 

module.exports = router;
