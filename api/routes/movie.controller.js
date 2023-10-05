const Movie = require("../models/Movie");

const createMovie = async (req, res) => {
  const newMovie = new Movie(req.body);
  // if the user is an admin, then create a new movie
  if (req.user.isAdmin) {
    try {
      const savedMovie = await newMovie.save();
      res.status(200).json(savedMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed to create movies!");
  }
};

const updateMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed to update movies!");
  }
};

const deleteMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("The movie has been deleted...");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed to delete movies!");
  }
};

const getMovie = async (req, res) => {
  try {
    // console.log(req.params.id);
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllMovies = async (req, res) => {
  if (req.user.isAdmin) {
    if (req.query.type) {
      try {
        const movies = await Movie.find({
          genres: {
            $in: [req.query.genre],
          },
        });
        res.status(200).json(movies);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      try {
        const movies = await Movie.find();
        res.status(200).json(movies);
      } catch (error) {
        res.status(500).json(error);
      }
    }
  } else {
    res.status(403).json("You are not allowed to view movies!");
  }
};

const getRandomMovie = async (req, res) => {
  const type = req.query.type;
  let movie;

  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        {
          $match: { isSeries: true },
        },
        {
          $sample: { size: 1 },
        },
      ]);
    } else {
      movie = await Movie.aggregate([
        {
          $match: { isSeries: false },
        },
        {
          $sample: { size: 1 },
        },
      ]);
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovie,
  getAllMovies,
  getRandomMovie,
};
