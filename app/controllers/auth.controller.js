const db = require("../models");
const config = require("../config/auth.config");
const Users = db.Users;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = async (req, res) => {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = {
      username,
      email,
      password: hashedPassword,
      role_id: role ? role : 1,
    };
    await Users.create(user)
    .then(createdUser=>{
      const token = jwt.sign({ id: createdUser.id }, config.secret, {
      expiresIn: 3600, // 1 hour
    });
    res.send({ id: createdUser.id, accessToken: token });

    })
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
        expiresIn: 3600 // 1 hour
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