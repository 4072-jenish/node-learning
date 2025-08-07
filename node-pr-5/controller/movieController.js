const moviesModel = require('../models/moviesModel');

const getMovies = async (req, res) => {
  try {
    const movies = await moviesModel.find();
    res.render('index', { movies });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getMovies
};
