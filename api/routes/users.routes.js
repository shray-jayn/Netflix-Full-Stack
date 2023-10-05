const userRouter = require("express").Router();

const verifyToken = require("../verifyToken");

const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserStats,
} = require("./user.controller");

userRouter.put("/:id", verifyToken, updateUser);
userRouter.delete("/:id", verifyToken, deleteUser);
userRouter.get("/find/:id", getUser);
userRouter.get("/", verifyToken, getAllUsers);
userRouter.get("/stats", getUserStats);

module.exports = userRouter;
