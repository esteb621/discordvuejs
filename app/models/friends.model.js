module.exports = (sequelize, Sequelize) => {
    const Friends = sequelize.define("Friends", {
      user1_id: {
        type: Sequelize.INTEGER,
        references:{
            model: 'Users',
            key: 'id',
            onDelete: 'CASCADE'
        }
      },    
      user2_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id',
          onDelete: 'CASCADE'
          
      }
        
      },
      published: {
        type: Sequelize.BOOLEAN
      }
  
    });
  
    return Friends;
  };
  
  