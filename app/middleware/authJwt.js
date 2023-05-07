const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Users = db.Users;

verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Accès refusé!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  const userId = req.headers['userid'];
  Users.findByPk(userId).then(user => {
    if(user.role_id==2){
      next();
      return;
    }
    res.status(403).send({
      message: "Vous devez être administrateur pour pouvoir accéder à cette fonction!"
    });
    return;    
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
module.exports = authJwt;