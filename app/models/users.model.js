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
    picture:{
      type:Sequelize.STRING,
      defaultValue:"https://firebasestorage.googleapis.com/v0/b/discordjs-ded7c.appspot.com/o/public%2Fprofile-default.jpg?alt=media&token=694e0cd3-627d-4f6a-aa4b-597743c47439"
    },
    published: {
      type: Sequelize.BOOLEAN
    }

  });

  return Users;
};

