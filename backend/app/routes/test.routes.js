module.exports = app => {
    const tests = require("../controller/test.controller.js");
  
    var router = require("express").Router();
  
    // Create a new test
    router.post("/", tests.create);

    // Retrieve all tests
    router.get("/", tests.findAll);
  
    // Retrieve a single test with id
     router.get("/:id", tests.findOne);
  
    // Update a question to test
    router.post("/addQuestions", tests.addQuestions);
  
    // Delete a test with id
    router.delete("/:id", tests.delete);
   
  
    
    app.use('/api/tests', router);
  };