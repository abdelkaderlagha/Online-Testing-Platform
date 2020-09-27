const db = require("../models");
const Question = db.questions;
const Answer = db.answers;
const Op = db.Sequelize.Op;


// Create and Save a new Question
exports.createQuestion = (req, res) => {
    // Validate request
    if (!req.body.question) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Question
    const question = {
      question: req.body.question,
      category: req.body.category,
      difficulty: req.body.difficulty,
      qtime: req.body.qtime,
      score: req.body.score,
      question_img: req.body.question_img,
      is_enabled: req.body.is_enabled
    };
  
    // Save Question in the database
    Question.create(question)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Question."
        });
      });
  };



  // Create and Save a new Answer
exports.createAnswer = (req, res) => {
    // Validate request
    if (!req.body.answer) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Answer
    const answer = {
        answer: req.body.answer,
        field_type: req.body.field_type,
        answer_image: req.body.answer_image,
        is_correct: req.body.is_correct,
        questionId: req.body.questionId
    };
  
    // Save Answer in the database
    Answer.create(answer)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Answer."
        });
      });
  };

  // Retrieve all Questions with Answers from the database.
exports.findAll = (req, res) => {
  
  Question.findAll({ include: [
    { model: db.answers, as: 'answers' }
] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    });
};

exports.findAllByCategory = (req, res) => {
  const id = req.params.id
  Question.findAll({ where:{
    category:id
  },include: [
    { model: db.answers, as: 'answers' }
] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    });
};

// Find a single Question by Id 
exports.findOne = (req, res) => {
  const id = req.params.id;

  Question.findByPk(id , { include: [
    { model: db.answers, as: 'answers' }
] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving question with id=" + id
      });
    });
};


// Update a Question by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Question.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Question was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Question with id=${id}. Maybe Question was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Question with id=" + id
      });
    });
};


// Delete a Question with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Question.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Question was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Question with id=${id}. Maybe Question was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Question with name=" + id
      });
    });
};


