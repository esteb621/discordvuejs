const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const mysql = require("mysql");
const mysql2 = require("mysql2");
var corsOptions = {
  origin: "http://localhost:8080"
};
app.use(express.static(path.join(__dirname, 'app/public')));

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));

// const db = require("./app/models");

// db.sequelize.sync()
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

const db = mysql.createConnection ({
  HOST: "database-2.ct0lavn8okva.eu-west-3.rds.amazonaws.com",
  PORT:3306,
  USER: "admin",
  PASSWORD: "root1234",
  DB: "projdiscord",
  });
  
  db.connect ((err) => {
  if (err) {
  console.log(err.message);
  return;
  }
  console.log("Database connected.");
  });


// simple route
app.get("/", (req, res) => {
  return "Welcolme to Beskoder"
});

require("./app/routes/discord.routes")(app);

// set port, listen for requests
//const PORT = process.env.PORT || 8080;
//app.listen(PORT, () => {
  //console.log(`Server is running on port ${PORT}.`);
//});