const { Router } = require("express");
const db = require("../models");
const fs = require('fs');
const Users = db.Users;

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
    mdp: req.body.mdp,
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
        })
        .catch(error => {
            console.log(error);
        });
  })
  .catch(error => res.status(400).json(error));
};


// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  Users.findAll({attributes: ['id','username', 'email'] })
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

exports.findOne = (req, res) => {
  const id = req.params.id;
  const login= req.params.username;
  const pwd= req.params.password;

  Users.findByPk(id, { attributes: ['username', 'email'] })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });

  Users.findForLogin(login,pwd, { attributes: ['username', 'password'] })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Username or Password incorrect`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with login=" + username
      });
    });

};


// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Users.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Users was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Users with id=${id}. Maybe Users was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

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
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
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