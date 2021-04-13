const morgan = require("morgan");
const express = require("express");
const app = express();

const logger_winston = require("./startup/logging");
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("startup/prod")(app);

process.on("uncaughtException", (ex) => {
  logger_winston.error(ex.message);
  process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  logger_winston.error(ex.message);
  process.exit(1);
});

//es posible que ya no debamos escriibr estas ultimas 6 lineas, winston las maneja por nosotros, sin embargo puede que las
//promesas rechazadas aun no las tome, por tanto , verificar como trabajar estos 2 casos con el default de winston

console.log(app.get("env"));
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled...");
}

//PORT
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = server;
