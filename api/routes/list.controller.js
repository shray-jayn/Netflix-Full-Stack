const List = require("../models/List");
const verifyToken = require("../verifyToken");

const createList = async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(200).json(savedList);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed to create lists!");
  }
};

const deleteList = async (req, res) => {
  if (req.user.isAdmin === true) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json("The list has been deleted...");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not allowed to delete lists!");
  }
};

const getAllLists = async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;

  let list = [];

  try {
    if (typeQuery) {
      if (genreQuery) {
        //the below code is equivalent to: list = await List.find({ type: typeQuery, genre: genreQuery });
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([
        {
          $sample: {
            size: 10,
          },
        },
      ]);
    }
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createList,
  deleteList,
  getAllLists,
};
