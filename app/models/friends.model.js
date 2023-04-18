module.exports = (sequelize, Sequelize) => {
    const Amis = sequelize.define("Amis", {
      user1_id: {
        type: Sequelize.INTEGER,
        references:{
            model: 'Users',
            key: 'id'
        }
      },    
      user2_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id'
      }
        
      },
      published: {
        type: Sequelize.BOOLEAN
      }
  
    });
  
    return Amis;
  };
  
  