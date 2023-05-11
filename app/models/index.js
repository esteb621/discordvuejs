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
db.Friends = require("./friends.model.js")(sequelize, Sequelize);
db.refreshToken = require("./refreshtoken.model.js")(sequelize, Sequelize);

db.refreshToken.belongsTo(db.Users, {
    foreignKey: 'userId', targetKey: 'id'
});

db.Users.hasOne(db.refreshToken, {
    foreignKey: 'userId', targetKey: 'id'
});

sequelize.sync();


module.exports = db;
