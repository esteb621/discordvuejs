module.exports = app => {
    const users = require("../controllers/users.controller.js");
    const roles = require("../controllers/roles.controller.js");
    const channels = require("../controllers/channels.controller");
    const messages = require("../controllers/messages.controller");
  
    var router = require("express").Router();
  
    // Create new values
    router.post("/createUser",users.create);
    router.post("/createRole", roles.create);
    router.post("/createChannel", channels.create);
    router.post("/createMessage", messages.create);


  
    // Retrieve all values
    router.get("/users", users.findAll);
    router.get("/roles", roles.findAll);
    router.get("/channels", channels.findAll);
    router.get("/messages", messages.findAll);



    // Retrieve all values that are published
    router.get("/published/users", users.findAllPublished);
    router.get("/published/roles", roles.findAllPublished);
    router.get("/published/channels", channels.findAllPublished);
    router.get("/published/messages", messages.findAllPublished);


  
    // Retrieve a single User or a single Role with id
    router.get("/users/:id", users.findOne);
    router.get("roles/:id", roles.findOne);
    router.get("/channels/:id", channels.findOne);
    router.get("/messages/:id", messages.findOne);
    router.get("/messages/channel/:id",messages.getMessagesByChannelId);

  
    // Update a User or a Role with id
    router.put("/update/users/id", users.update);
    router.put("/update/roles/id", roles.update);
    router.put("/update/channels/id", channels.update);
    router.put("/update/messages/id", messages.update);
   

  
    // Delete a User or a Role with id
    router.delete("/delete/idu", users.delete);
    router.delete("/delete/idr", roles.delete);
    router.delete("/delete/idc", channels.delete);
    router.delete("/delete/idm", messages.update);


  
    // Delete all Users and all Roles
    router.delete("/delete_users", users.deleteAll);
    router.delete("/delete_roles", roles.deleteAll);
    router.delete("/delete_channels", channels.deleteAll);
    router.delete("/delete_messages", messages.deleteAll);

    app.use('/api/discord', router);
  };
  