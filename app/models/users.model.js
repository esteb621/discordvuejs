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
    role_id:{
      type:Sequelize.INTEGER,
      references:{
        model:'Roles',
        key: 'id'
    }
    },
    published: {
      type: Sequelize.BOOLEAN
    }

  });

  return Users;
};

