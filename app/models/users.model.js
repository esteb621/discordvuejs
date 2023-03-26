module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("Users", {
    username: {
      type: Sequelize.STRING
    },    
    email: {
      type: Sequelize.STRING
    },
    mdp: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }

  });

  return Users;
};

