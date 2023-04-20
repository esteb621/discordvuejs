const db = require("../models");
const Channels = db.Channels;
const Op = db.Sequelize.Op;

// Créer et enregister un nouveau channel
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom || !req.body.typologie) {
    res.status(400).send({
      message: "Le contenu ne peut pas etre vide !"
    });
    return;
  }

  // Créer un channel
  const channels = {
    nom: req.body.nom,
    typologie: req.body.typologie,
    published: req.body.published ? req.body.published : false
  };

  // Enregistrer un channel dans la base de données
  Channels.create(channels)
    .then(data => {
      res.send(data.id);
      return;
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite en voulant récupérer le channel."
      });
      return;
    });
    return;
};

// Récupérer tous les channels de la base de données en fonction de leur typologie.
exports.findAll = (req, res) => {
  const nom = req.query.nom;
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
          message: "Channel a bien été mis à jour."
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

  Channels.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Channel was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Channel with id=${id}. Maybe Channel was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Channel with id=" + id
      });
    });
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
