const authRouter = require("express").Router();

const { registerUser, loginUser } = require("./auth.controller");

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

module.exports = authRouter;
// Path: api\routes\auth.routes.js
