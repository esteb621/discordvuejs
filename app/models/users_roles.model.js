module.exports = (sequelize, Sequelize) => {
    const Users_Roles = sequelize.define("Users_Roles", {
        User_id: {
            type: Sequelize.INTEGER,
            references:{
                model:'Users',
                key: 'id'
            }
        },
        role_id: {
            type: Sequelize.INTEGER,
            references:{
                model:'Roles',
                key: 'id'
            }
        },
        published: {
            type: Sequelize.BOOLEAN
          }
  });

  return Users_Roles;
};
