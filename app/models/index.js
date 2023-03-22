const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  
  {
    host: config.HOST,
    port: config.PORT,
    logging: console.log,
    maxConcurrentQueries: 100,
    dialect: config.dialect,
    dialectOptions: {
        ssl:'Amazon RDS'
    },
    pool: { maxConnections: 5, maxIdleTime: 30},
    language: 'en'

    // pool: {
    //   max: dbConfig.pool.max,
    //   min: dbConfig.pool.min,
    //   acquire: dbConfig.pool.acquire,
    //   idle: dbConfig.pool.idle
    // }
  }
);


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("./users.model.js")(sequelize, Sequelize);
db.Roles = require("./roles.model.js")(sequelize, Sequelize);
db.Messages = require("./messages.model.js")(sequelize, Sequelize);
db.Channels = require("./channels.model.js")(sequelize, Sequelize);
db.Channels_Roles = require("./channel_roles.model.js")(sequelize, Sequelize);
db.Users_Roles = require("./users_roles.model.js")(sequelize, Sequelize);

sequelize.sync();


//db.Roles.belongsToMany(db.Users, {
  //through: "users_roles",
  //foreignKey: "roleId",
  //otherKey: "userId"
//});
//db.Users.belongsToMany(db.Roles, {
  //through: "users_roles",
  //foreignKey: "userId",
  //otherKey: "roleId"
//});

db.ROLES = ["user","admin", "moderator"];

module.exports = db;
