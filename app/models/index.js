const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://doadmin:AVNS_c20ZZfbq8bY5gHytiQf@db-mysql-pd-do-user-13887801-0.b.db.ondigitalocean.com:25060/defaultdb?ssl-mode=REQUIRED");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("./users.model.js")(sequelize, Sequelize);
db.Roles = require("./roles.model.js")(sequelize, Sequelize);
db.Messages = require("./messages.model.js")(sequelize, Sequelize);
db.Channels = require("./channels.model.js")(sequelize, Sequelize);
db.Amis = require("./amis.model.js")(sequelize, Sequelize);



sequelize.sync();


module.exports = db;
