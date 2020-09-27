module.exports = app => {
    const users = require("../controller/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new user
    router.post("/", users.create);
  
    // Retrieve all users
    router.get("/", users.findAll);

    // Retrieve all users
    router.get("/userTests", users.findAllUserTests);
  
    // Retrieve a single user with name
    router.get("/:id", users.findOne);
  
    // Update a user with name
    router.put("/:name", users.update);
  
    // Delete a user with name
    router.delete("/:id", users.delete);
  
    
    // add tests to users
    router.post("/addTests", users.addTests);
    

    
    app.use('/api/users', router);
  };