const db = require("../models");
const Friends = db.Friends;
const Op = db.Sequelize.Op;

// Créer et Sauvegarder un nouvel Ami
exports.create = (req, res) => {
  // Validate request
  if (!req.body.idu1 || !req.body.idu2) {
    res.status(400).send({
      message: "Le contenu du body ne peut pas etre vide !"
    });
    return;
  }

  // Créer un ami
  const friends = {
    user1_id: req.body.idu1,
    user2_id: req.body.idu2,
    published: req.body.published ? req.body.published : false
  };

  // Enregistrer l'ami dans la base de données
  Friends.create(friends)
    .then(data => {
      res.send(data);
      return;
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite en créant un ami."
      });
      return;
    });
};

// Récupérer tous les friends de la base de données.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Friends.findAll({ where: condition })
    .then(data => {
      res.send(data);
      return;
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite en récupérant la table friends."
      });
      return;
    });
    return;
};

// Trouver un seul ami avec un id
exports.findOne = (req, res) => {
    const idparam = req.params.id;
  
    Friends.findOne({ attributes: ['user1_id','user2_id'] , where: {id:idparam}})
      .then(data => {
          res.send(data);
          return;
        })
      .catch(err => {
          res.status(500).send({
            message: "Erreur serveur"
          });
          return;
        });
      if (typeof data==='undefined'){
        res.status(404).send({
          message: "Il n'y a pas d'ami avec id=" + idparam
        });
        return;
      }
}

// Mettre à jour un ami à l'aide de son id
exports.update = (req, res) => {
  const id = req.params.id;
  req.body.id = id;
  if(req.body.id,req.body.idu1,!req.body.idu2){
    Friends.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "l'ami a été correctement mis à jour."
        });
      } else {
        res.send({
          message: `Il n'existe pas d'ami avec id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur serveur"
      });
    });
    return;
}
if(req.body.id,!req.body.idu1,req.body.idu2){
  Friends.update(req.body, {
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "l'ami a été correctement mis à jour."
            });
          } else {
            res.send({
              message: `Il n'existe pas d'ami avec id=${id}.`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Erreur serveur"
          });
        });
    }
    return;
};

// Effacer un ami spécifique
exports.delete = (req, res) => {
  const id = req.params.id;

  Friends.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "l'ami a bien été supprimé !"
        });
        return;
      } 
      else {
        res.send({
          message: `Il n'existe pas d'ami avec id=${id}.`
        });
        return;
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur serveur"
      });
      return;
    });
};

// Effacer tous les friends de la base de données.
exports.deleteAll = (req, res) => {
  Friends.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tous les friends ont bien été supprimés !` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite en voulant supprimer tous les friends."
      });
    });
};

// Trouver tous les friends publiés
exports.findAllPublished = (req, res) => {
  Channels_Roles.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite en voulant afficher tous les friends."
      });
    });
};
