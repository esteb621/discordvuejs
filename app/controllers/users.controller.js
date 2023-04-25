const { where } = require("sequelize");
const db = require("../models");
const Users = db.Users;
const pictureController = require("../controllers/picture.controller")

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.mdp || !req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    picture: req.body.picture,
    published: req.body.published ? req.body.published : false
  };

  // Save User in the database
  Users.create(user)
  .then(user => {
      res.status(201).json(user);
      // perform http request here or in another function 
      var url = 'get_data.php';
      var params = 'orem=ipsum&name=binny';
      axios.post(url, params)
        .then(response => {
            console.log(response.data);
            return;
        })
        .catch(error => {
            console.log(error);
            return;
        });
  })
  .catch(error => res.status(400).json(error));
  return;
};


// Retrieve all Users from the database.
exports.findAll = (req, res) => {

  Users.findAll({attributes: ['id','username', 'email','picture'] })
    .then(data => {
      res.send(data);
      return;
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
      return;
    });
};

exports.findOne = (req, res) => {
  const idu = req.params.id;
  Users.findByPk(idu)
    .then(data => {
       res.send(data);
      })
    .catch(err => {
        console.log(err);
        res.status(500).send({
          message: "Error retrieving User with id=" + idu
        });
      });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const idparam = req.params.id;
  req.body.id = idparam; 
      Users.update(req.body, {
        where: { id: idparam}
      })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Users was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Users with id=${idparam}. Maybe Users was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + idparam
      });
    });
  }

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Users.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
        return;
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
        return;
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
      return;
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  Users.destroy({
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};

// find all published Users
exports.findAllPublished = (req, res) => {
  Users.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};