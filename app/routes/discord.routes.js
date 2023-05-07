
module.exports = app => {
    const users = require("../controllers/users.controller.js");
    const roles = require("../controllers/roles.controller");
    const channels = require("../controllers/channels.controller");
    const messages = require("../controllers/messages.controller");
    const friends = require("../controllers/friends.controller.js");
    const { verifySignUp, authJwt } = require("../middleware");

    var router = require("express").Router();
  
    // Create new value
    router.post("/createUser",users.create);
    router.post("/createRole", roles.create);
    router.post("/createChannel",[authJwt.isAdmin], channels.create);
    router.post("/createMessage", messages.create);
    router.post("/createFriend", friends.create);


  
    // Retrieve all values
    router.get("/users", users.findAll);
    router.get("/roles", roles.findAll);
    router.get("/channels/:type", channels.findAll);
    router.get("/messages", messages.findAll);
    router.get("/friends", friends.findAll);



    // Retrieve all values that are published
    router.get("/published/users", users.findAllPublished);
    router.get("/published/roles", roles.findAllPublished);
    router.get("/published/channels", channels.findAllPublished);
    router.get("/published/messages", messages.findAllPublished);
    router.get("/published/friends", friends.findAllPublished);


  
    // Retrieve a single value
    router.get("/user/:id", users.findOne);
    router.get("/role/:id", roles.findOne);
    router.get("/channel/:id", channels.findOne);
    router.get("/message/:id", messages.findOne);
    router.get("/messages/channel/:id",messages.getMessagesByChannelId);
    router.get("/friend/:id", friends.findOne)

  
    // Update a User or a Role with id
    router.put("/update/users/:id",users.update);
    router.put("/update/roles/:id", roles.update);
    router.put("/update/channel/:id", channels.update);
    router.put("/update/message/:id", messages.update);  
    router.put("/update/friend/:id", friends.update);

  
    // Delete a value
    router.delete("/delete/users/:id", users.delete);
    router.delete("/delete/roles/:id", roles.delete);
    router.delete("/delete/channels/:id",[authJwt.verifyToken, authJwt.isAdmin], channels.delete);
    router.delete("/delete/messages/:id", messages.update);
    router.delete("/delete/friends/:id", friends.delete);


   
    // Delete all
    router.delete("/delete_users",[authJwt.isAdmin], users.deleteAll);
    router.delete("/delete_roles",[authJwt.isAdmin], roles.deleteAll);
    router.delete("/delete_channels",[authJwt.isAdmin], channels.deleteAll);
    router.delete("/delete_messages",[authJwt.isAdmin], messages.deleteAll);
    router.delete("/delete_friends",[authJwt.isAdmin], friends.deleteAll);
    
    app.use('/api/discord', router);
  };
  