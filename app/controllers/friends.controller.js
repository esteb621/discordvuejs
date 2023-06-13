const db = require("../models");
const Friends = db.Friends;
const Users = db.Users;
const Op = db.Sequelize.Op;

// Créer et Sauvegarder un nouvel Ami
exports.create = async (req, res) => {


  // Validate request
  if (!req.body.user1_id || !req.body.user2) {
    res.status(400).send({
      message: "Les utilisateurs n'existent pas ou le body est vide !"
    });
    return;
  }

  Users.findOne({where: {username:req.body.user2}})
    .then(user2=>{
      const user_1 = req.body.user1_id;
      const user_2 = user2.id;
    
    console.log("User 1 : "+user_1);
    console.log("User 2 : "+user_2);
    if (user_1 == user_2){
      res.status(400).send({
        message: "Un utilisateur ne peut pas etre ami avec lui meme !"
      });
      return;
    }
    Friends.findOne({ 
      where: { 
        user1_id: user_1,
        user2_id: user_2 }
      })
      .then(friends => {
        if(friends === null){
          // Créer un ami
          const friends = {
            user1_id: user_1,
            user2_id: user_2,
            published: req.body.published ? req.body.published : false
          };
          
          // Enregistrer l'ami dans la base de données
          Friends.create(friends)
          .then(data => {
            console.log("ami crée")
            Friends.findOne({ 
              where: { 
                user1_id: data.user1_id,
                user2_id: data.user2_id }
              })
              .then(friends => {
                res.send(friends);
              })
              .catch(err => {
                res.status(500).send({
                  message:
                    err.message || "Une erreur s'est produite en créant un ami."
                });
                return;
              })
          })
        }
        else{
          res.status(404).send({
            message: "Ces 2 utilisateurs sont déjà ami !"
          })
        }
      })
  })
  .catch(() => {
    res.status(404).send({
      message: "L'utilisateur "+req.body.user2+" n'existe pas"
    })
  })
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
    Friends.findByPk(idparam)
      .then(data => {
          res.send(data);
          return;
        })
      .catch(err => {
          res.status(500).send({
            message: "Erreur serveur"
          });
          return;
        })
}

// Mettre à jour un ami à l'aide de son id
exports.update = (req, res) => {
  const id= req.params.id;
  req.body.id = id;
  
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
