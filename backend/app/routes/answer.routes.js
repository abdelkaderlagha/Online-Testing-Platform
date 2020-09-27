module.exports = app => {
    const answers = require("../controller/question.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Answers
    router.post("/", answers.createAnswer);
    
   
  
    
    app.use('/api/answers', router);
  };