module.exports = app => {
    const questions = require("../controller/question.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Question
    router.post("/", questions.createQuestion);

    // Get all questions including answers
      router.get("/", questions.findAll);

      // Get all questions including answers
      router.get("/category/:id", questions.findAllByCategory);


    // Get a question by id
    router.get("/:id", questions.findOne);
    

    // Update a question by id
    router.put("/:id", questions.update);
    

    // Delete a question by id
    router.delete("/:id", questions.delete);
    
   
  
    
    app.use('/api/questions', router);
  };