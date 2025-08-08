const moviesModel = require('../models/moviesModel');
const fs = require('fs');
const path = require('path');

const getMovies = async (req, res) => {
  try {
    const movies = await moviesModel.find();
    res.render('index', { movies });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send('Internal Server Error');
  }
};
const createMovie = async (req, res) => {
  try {
    const newMovie = new moviesModel({
      title: req.body.title,
      director: req.body.director,
      genre: req.body.genre.split(',').map(g => g.trim()),
      releaseDate: req.body.releaseDate,
      duration: req.body.duration,
      rating: req.body.rating,
      language: req.body.language,
      poster: req.file ? req.file.filename : null
    });
    await newMovie.save();
    res.redirect('/');
  } catch (error) {
    console.error('Error adding movie:', error);
  }
};
const editMovieForm = async (req, res) => {
  try {
    const movie = await moviesModel.findById(req.params.id);
    if (!movie) return res.status(404).send('Movie not found');
    res.render('edit', { movie });
  } catch (error) {
    console.error('Error fetching movie for edit:', error);
    res.status(500).send('Internal Server Error');
  }
};

const updateMovie = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      director: req.body.director,
      genre: req.body.genre.split(',').map(g => g.trim()),
      releaseDate: req.body.releaseDate,
      duration: req.body.duration,
      rating: req.body.rating,
      language: req.body.language
    };

    if (req.file) {
      updateData.poster = req.file.filename;
    }

    await moviesModel.findByIdAndUpdate(req.params.id, updateData);
    res.redirect('/');
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).send('Internal Server Error');
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await moviesModel.findById(req.params.id);
    if (!movie) {
      return res.status(404).send('Movie not found');
    }

    if (movie.poster) {
      const filePath = path.join(__dirname, '..', 'uploads', movie.poster);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log('Poster deleted:', movie.poster);
        }
      });
    }

    await moviesModel.findByIdAndDelete(req.params.id);

    res.redirect('/');
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).send('Internal Server Error');
  }
};
const showSeatSelection = async (req, res) => {
  try {
    const movie = await moviesModel.findById(req.params.id);
    if (!movie) return res.status(404).send('Movie not found');

    // Just for example, we'll make a 5x8 seat layout
    const totalRows = 5;
    const seatsPerRow = 8;

    res.render('reserveSeats', {
      movie,
      totalRows,
      seatsPerRow
    });
  } catch (error) {
    console.error('Error loading seat selection:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Handle reservation
const reserveSeats = async (req, res) => {
  try {
    const { selectedSeats } = req.body; // This will be an array of seat IDs
    const movie = await moviesModel.findById(req.params.id);

    if (!movie) return res.status(404).send('Movie not found');

    // For now, just log or save reserved seats
    console.log(`Seats reserved for movie ${movie.title}:`, selectedSeats);

    // Redirect to confirmation or homepage
    res.redirect('/movies');
  } catch (error) {
    console.error('Error reserving seats:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getMovies,
  createMovie,
  editMovieForm,
  updateMovie,
  deleteMovie,
  showSeatSelection,
  reserveSeats
};
