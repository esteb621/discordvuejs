module.exports = (sequelize, Sequelize) => {
    const Messages = sequelize.define("Messages", {
        
        text: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.INTEGER,
            references:{
                model: 'Users',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        channel_id:{
            type: Sequelize.INTEGER,
            references:{
                model: 'Channels',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        published: {
            type: Sequelize.BOOLEAN
          }

  });

  return Messages;
};
