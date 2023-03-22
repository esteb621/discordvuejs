module.exports = {
  HOST: "database-2.ct0lavn8okva.eu-west-3.rds.amazonaws.com",
  PORT:3306,
  USER: "admin",
  PASSWORD: "root1234",
  DB: "projdiscord",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    }

  };