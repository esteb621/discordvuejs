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
    const channelData = [{
            nom: 'Jeux vidéo',
            typology: 2
        },
        {
            nom: 'FPS',
            typology: 2
        },
        {
            nom: 'RPG',
            typology: 2
        },
        {
            nom: 'Manga : Shonen',
            typology: 2
        },
        {
            nom: 'Manga : Seinen',
            typology: 2
        },
        {
            nom: 'Développement informatique : Java',
            typology: 3
        },
        {
            nom: 'Développement informatique : Python',
            typology: 3
        },
    ]

    Channels.bulkCreate(channelData, {
            ignoreDuplicates: true
        })
        .then(data => {
            console.log("Canal ajouté avec succès: ", data.name);
        })
        .catch(err => {
            console.error("Erreur lors de l'ajout du canal: ", err);
        });
    return Channels;
};