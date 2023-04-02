module.exports = app => {
    const authController = require('../controllers/auth.controller');

    var router = require("express").Router();

    // Route pour l'inscription
    router.post("/signup", authController.signup);

    // Route pour l'authentification
    router.post("/login", authController.login);
    
    app.use('/api/auth', router);
};
