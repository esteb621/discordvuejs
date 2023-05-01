module.exports = (sequelize, Sequelize) => {
    const Friends = sequelize.define("Friends", {
      user1_id: {
        type: Sequelize.INTEGER,
        references:{
            model: 'Users',
            key: 'id',
        }
      },    
      user2_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id',
          
      }
        
      },
      published: {
        type: Sequelize.BOOLEAN
      }
  
    });
  
    return Friends;
  };
  
  