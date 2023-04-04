module.exports = (sequelize, Sequelize) => {
    const Channels = sequelize.define("Channels", {

        nom: {
            type: Sequelize.STRING,
            unique: true
        },
        typologie: {
            type: Sequelize.INTEGER
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });
};