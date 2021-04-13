const logger = require("../middleware/logger");
const authentication = require("../middleware/authentication");
const helmet = require("helmet");
const express = require("express");
const genres = require("../routes/genres.js");
const customers = require("../routes/customers");
const movies = require("../routes/movies.js");
const rentals = require("../routes/rentals.js");
const users = require("../routes/users.js");
const auth = require("../routes/auth.js");
const returns = require("../routes/returns.js");
const error = require("../middleware/error.js");

module.exports = function (app) {
  // app.use(express.urlencoded(extended:true)); // key=value&key=value
  // app.use(express.static('public')); // crear una carpeta public , adentro un archivo "ejemplo.txt" y en la url podremos acceder
  //como  /ejemplo.txt
  // app.use(helmet());
  // app.use(logger);
  app.use(authentication);
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/returns", returns);
  app.use(error);
};
