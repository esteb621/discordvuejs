module.exports = {
  HOST: "database-1.ct0lavn8okva.eu-west-3.rds.amazonaws.com",
  PORT:3306,
  USER: "root",
  PASSWORD: "root1234",
  DB: "discordjs",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    }

  };