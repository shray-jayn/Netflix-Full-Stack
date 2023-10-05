//express is globally installed
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const path = require("path");

const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/users.routes");
const movieRouter = require("./routes/movies.routes");
const listRouter = require("./routes/lists.routes");
const morgan = require("morgan");

const app = express();
app.use(express.json());

app.use(
  cors({
    //client side   //admin side
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

app.use(morgan("dev"));

// app.use(express.static(path.join(__dirname, "public/admin ")));
// app.use(express.static(path.join(__dirname, "public/client ")));

//middleware
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/lists", listRouter);

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "client", "index.html"));
// });

// app.get("/admin", function (req, res) {
//   res.sendFile(path.join(__dirname, "admin ", "index.html"));
// });

module.exports = app;
