const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const auth = require("../config/auth.config");
const User = db.Users;

exports.signup = (req, res) => {
  // Vérification que les champs obligatoires sont bien renseignés
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Tous les champs sont obligatoires !" });
  }
  // Vérification si le nom d'utilisateur existe déjà dans la base de données
  User.findOne({ where: { username: req.body.username } })
    .then(existingUser => {
      if (existingUser) {
        return res.status(400).send({ message: "Cette utilisateur existe déjà!" });
      }
    });

  // Création d'un objet User
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  };

  // Enregistrement de l'utilisateur dans la base de données
  User.create(user)
    .then(user => {
      // Création du JWT 
      if (!auth.secret) {
        console.error("Il manque la clé du JWT");
        return res.status(500).json({ message: "Internal server error" });
      }
      const token = jwt.sign({ id: user.id }, auth.secret, {
        expiresIn: 86400 // Délai de 24h
      });
      console.log("JWT crée: ", token);

      res.status(200).json(token);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

exports.login = (req, res) => {
    console.log("Logging in user...");
    // Vérification que les champs obligatoires sont bien renseignés
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires !" });
    }
  
    // Recherche de l'utilisateur dans la base de données par son username
    User.findOne({ where: { username: req.body.username } })
      .then(user => {
        // Vérification que l'utilisateur existe et que le mot de passe est correct
        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect !" });
        }
        // Création du JWT
        const token = jwt.sign({ id: user.id }, auth.secret, {
          expiresIn: 86400 // Délai de 24h
        });
        console.log("JWT token created: ", token);
        
        res.status(200).json(token);
      })
      .catch(err => {
        console.log("Error logging in user: ", err.message);
        res.status(500).json({ message: err.message});
      });
  };
  