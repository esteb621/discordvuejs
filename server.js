const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

const db = require("./app/models");


db.sequelize.sync()
   .then(() => {
     console.log("Synced db.");
   })
   .catch((err) => {
     console.log("Failed to sync db: " + err.message);
   });

function initial(){
  db.Roles.create({
    id: 1,
    name: "user"
  });
  db.Roles.create({
    id: 2,
    name: "moderator"
  });
  db.Roles.create({
    id: 3,
    name: "admin"
  });
}
require("./app/routes/discord.routes")(app);
require("./app/routes/auth.routes")(app);
require('./app/routes/user.routes.js')(app);

const path = __dirname + '/app/views/';

app.use(express.static(path));

app.get('*', function (req,res) {
    res.sendFile(path + "index.html");
  });
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});