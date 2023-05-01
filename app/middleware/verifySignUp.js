const db = require("../models");
const Roles = db.Roles;
const Users = db.Users;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  Users.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Ce nom d'utilisateur existe déja!"
      });
      return;
    }

    // Email
    Users.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Un compte avec cet email a déjà été crée!"
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.role) {
      if (!Roles.includes(req.body.role)) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.role
        });
        return;
      }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;