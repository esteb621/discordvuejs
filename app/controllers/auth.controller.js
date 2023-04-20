const db = require("../models");
const config = require("../config/auth.config");
const Users = db.Users;
const Roles = db.Roles;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  Users.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role_id: req.body.role ? req.body.role : 1
  })
    .then(user => {
      
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.send({ id: user.id, accessToken: token });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  Users.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(401).send({ message: "Nom d'utilisateur inconnu!" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mot de passe incorrect!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
          id: user.id,
          accessToken: token
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};