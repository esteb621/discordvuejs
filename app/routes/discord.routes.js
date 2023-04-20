
module.exports = app => {
    const users = require("../controllers/users.controller.js");
    const roles = require("../controllers/roles.controller");
    const channels = require("../controllers/channels.controller");
    const messages = require("../controllers/messages.controller");
    const friends = require("../controllers/friends.controller.js");
  
    var router = require("express").Router();
  
    // Create new values
    router.post("/createUser",users.create);
    router.post("/createRole", roles.create);
    router.post("/createChannel", channels.create);
    router.post("/createMessage", messages.create);
    router.post("/createAmi", friends.create);


  
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


  
    // Retrieve a single User or a single Role with id
    router.get("/users/:id", users.findOne);
    router.get("/roles/:id", roles.findOne);
    router.get("/channel/:id", channels.findOne);
    router.get("/messages/:id", messages.findOne);
    router.get("/messages/channel/:id",messages.getMessagesByChannelId);
    router.get("/friends/:id", friends.findOne)

  
    // Update a User or a Role with id
    router.put("/update/users/:id", users.update);
    router.put("/update/roles/:id", roles.update);
    router.put("/update/channel/:id", channels.update);
    router.put("/update/messages/:id", messages.update);  
    router.put("/update/friends/:id", friends.update);

  
    // Delete a User or a Role with id
    router.delete("/delete/users/:id", users.delete);
    router.delete("/delete/roles/:id", roles.delete);
    router.delete("/delete/channels/:id", channels.delete);
    router.delete("/delete/messages/:id", messages.update);
    router.delete("/delete/friends/:id", friends.delete);


   
    // Delete all Users and all Roles
    router.delete("/delete_users", users.deleteAll);
    router.delete("/delete_roles", roles.deleteAll);
    router.delete("/delete_channels", channels.deleteAll);
    router.delete("/delete_messages", messages.deleteAll);
    router.delete("/delete_friends", friends.deleteAll);
    
    app.use('/api/discord', router);
  };
  