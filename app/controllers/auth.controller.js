const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");

const User = db.Users;

exports.signup = (req, res) => {
  // Vérification que les champs obligatoires sont bien renseignés
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).send({ message: "Tous les champs sont obligatoires !" });
  }

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
      if (!process.env.JWT_SECRET) {
        console.error("Il manque la clé du JWT dans le fichier .env");
        return res.status(500).send({ message: "Internal server error" });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // Délai de 24h
      });
      console.log("JWT token created: ", token);

      // Redirection vers la page d'accueil avec le token dans le cookie
      res.cookie("jwt", token, { httpOnly: true, maxAge: 86400 * 1000 });
      res.redirect("http://www.google.com");
    })
    .catch(err => {
      console.log("Error creating user: ", err.message);
      res.status(500).send({ message: err.message });
    });
};

exports.login = (req, res) => {
    console.log("Logging in user...");
    // Vérification que les champs obligatoires sont bien renseignés
    if (!req.body.username || !req.body.password) {
      console.log("Missing required fields.");
      return res.status(400).send({ message: "Tous les champs sont obligatoires !" });
    }
    
    // Création d'un objet User
    const user = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8)
    };
  
    // Recherche de l'utilisateur dans la base de données par son username
    User.findOne({ where: { username: req.body.username } })
      .then(user => {
        // Vérification que l'utilisateur existe et que le mot de passe est correct
        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
          console.log("Incorrect username or password.");
          return res.status(401).send({ message: "Nom d'utilisateur ou mot de passe incorrect !" });
        }
  
        // Création du JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: 86400 // Délai de 24h
        });
        console.log("JWT token created: ", token);
  
        // Redirection vers la page d'accueil avec le token dans le cookie
        res.cookie("jwt", token, { httpOnly: true, maxAge: 86400 * 1000 });
        res.redirect("/");
      })
      .catch(err => {
        console.log("Error logging in user: ", err.message);
        res.status(500).send({ message: err.message });
      });
  };
  