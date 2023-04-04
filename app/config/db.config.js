module.exports = {
  HOST: "db-mysql-pd-do-user-13887801-0.b.db.ondigitalocean.com",
  PORT:25060,
  USER: "doadmin",
  PASSWORD: "AVNS_c20ZZfbq8bY5gHytiQf",
  DB: "defaultdb",
  dialect: "mysql",
  dialectOptions:{
    ssl: {
      ca: 'path/to/ca'
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    }

  };