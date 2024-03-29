const db = require("../models");
const Channels = db.Channels;
const Messages = db.Messages;
const Op = db.Sequelize.Op;

// Créer et enregister un nouveau channel
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom) {
    res.status(400).send({
      message: "Le contenu ne peut pas etre vide !"
    });
    return;
  }
  // Créer un channel
  const channels = {
    nom: req.body.nom,
    typologie: 1,
    published: req.body.published ? req.body.published : false
  };

  // Enregistrer un channel dans la base de données
  Channels.create(channels)
    .then(data => {
      res.send({
        id:data.id,
        nom:data.nom
      });
      return;
    })
    .catch(() => {
      res.status(500).send({
        message:
          "Ce channel existe déjà!"
      });
      return;
    });
    return;
};

// Créer et enregister un nouveau channel
exports.createPrivateChannel = (req, res) => {
  // Validate request
  if (!req.body.nom) {
    res.status(400).send({
      message: "Le contenu ne peut pas etre vide !"
    });
    return;
  }
  // Créer un channel
  const channels = {
    nom: req.body.nom,
    typologie: 2,
    published: req.body.published ? req.body.published : false
  };

  // Enregistrer un channel dans la base de données
  Channels.create(channels)
    .then(data => {
      res.send({
        id:data.id,
        nom:data.nom
      });
      return;
    })
    .catch(() => {
      res.status(500).send({
        message:
          "Ce channel existe déjà!"
      });
      return;
    });
    return;
};

// Récupérer tous les channels de la base de données en fonction de leur typologie.
exports.findAll = (req, res) => {
  const type = req.params.type;
  var condition = type ? { type: { [Op.like]: `%${type}%` } } : null;

  if (condition && condition.type) {
    Channels.findAll({ where: { typologie: type } })
      .then(data => {
        if (data.length === 0) {
          res.status(404).json({
            message: "Pas de channel correspondant à cette typologie"
          });
        } else {
          res.json(data);
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Une erreur s'est produite en voulant récupérer les channels"
        });
      });
  } else {
    res.status(400).json({
      message: "Le paramètre type est manquant ou invalide"
    });
  }
};

// Récupérer un seul channel en fonction de son id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Channels.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Il n'y a pas de channel avec id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Une erreur s'est produite en voulant récupérer le channel avec id=" + id
      });
    });
};

// Mise à jour d'un channel
exports.update = (req, res) => {
  const idparam = req.params.id;
  req.body.id = idparam; 
      Channels.update(req.body, {
        where: { id: idparam}
      })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Le channel a bien été mis à jour."
        });
      }
       else {
        res.send({
          message: `Impossible de mettre à jour le channel avec id=${idparam}. Le channel n'a pas été trouvé ou le body est vide !`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Channels with id=" + id
      });
    });
  }

// Delete a Channel with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Messages.destroy({
    where: {channel_id:id},
    truncate: false
  })
  .then(()=> {
    Channels.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Le channel a bien été supprimé"
          });
        } else {
          res.send({
            message: `Cannot delete Channel with id=${id}. Maybe Channel was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Une erreur interne est survenue. Veuillez réessayer",
          error:err
        });
      });
  })
};

// Delete all Channels from the database.
exports.deleteAll = (req, res) => {
  Channels.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Channels were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all channels."
      });
    });
};

// find all published Channel
exports.findAllPublished = (req, res) => {
  Channels.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving channels."
      });
    });
}


exports.findAllPrivateMessages = (req,res) => {
    if(!req.params.id){
      res.status(400).send({
        message: "Parametre id manquant"
      })
      return;
    }
    const userId = req.params.id;
    Channels.findAll({
      where: {
          nom: {
              [Op.or]: [
                  { [Op.like]: 'channel_' + userId + '_%' },
                  { [Op.like]: 'channel_' + '%_' + userId }
              ]
          }
      }
    })
    .then(channels => {
      res.send(channels)
      console.log(channels);
  })
    .catch(err => {
      res.status(500).send(err);
  });
}