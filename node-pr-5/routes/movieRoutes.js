const express = require('express');
const router = express.Router();
const { getMovies, createMovie, editMovieForm, updateMovie, deleteMovie, showSeatSelection, reserveSeats  } = require('../controller/movieController');
const upload = require('../middleware/multerImage');

router.get('/', getMovies); 

router.get('/add', (req, res) => {
    res.render('addMovie');
  });
router.post('/add', upload.single('poster'), createMovie);
router.get('/edit/:id' ,editMovieForm);
router.post('/edit/:id', upload.single('poster'), updateMovie);
router.post('/delete/:id', deleteMovie);
router.get('/:id/reserve', showSeatSelection);
router.post('/:id/reserve', reserveSeats);


module.exports = router;
