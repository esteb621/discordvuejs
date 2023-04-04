module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("Users", {
    username: {
      type: Sequelize.STRING
    },    
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }

  });

  return Users;
};

