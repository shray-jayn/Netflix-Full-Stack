const movieRouter = require("express").Router();
const verifyToken = require("../verifyToken");

const {
  updateMovie,
  deleteMovie,
  getMovie,
  getRandomMovie,
  createMovie,
  getAllMovies,
} = require("./movie.controller");

movieRouter.post("/", verifyToken, createMovie);
movieRouter.put("/:id", verifyToken, updateMovie);
movieRouter.delete("/:id", verifyToken, deleteMovie);
movieRouter.get("/find/:id", getMovie);
movieRouter.get("/", verifyToken, getAllMovies);
movieRouter.get("/random", getRandomMovie);

module.exports = movieRouter;
