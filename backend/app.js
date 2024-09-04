var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var cors = require("cors");
const moment = require('moment');

require("dotenv").config();

const authRouter = require("./routes/authRouter");
const tasksRouter = require("./routes/tasksRouter");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/API/auth", authRouter);
app.use("/API/tasks", tasksRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Show unhandled rejections
process.on("unhandledRejection", function (reason, promise) {
  console.log(promise);
});

const port = process.env.PORT || 8000;
app.listen(port);
console.log(`Listening to requests on http://localhost:${port}/API`);

module.exports = app;
