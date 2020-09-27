const db = require("../models");
const Test = db.tests;
const Question = db.questions;
const Answer = db.answers;
const TestQuestion = db.test_questions;
//create Test


exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Test
  const test = {
    name: req.body.name,
    category: req.body.category,
    ttime: req.body.ttime,
    needs_score: req.body.needs_score
  }
  // Save Test in the database
  Test.create(test)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Test."
      });
    });
};

//find All Tests : 

exports.findAll = (req, res) => {
  
  Test.findAll({
    include: [
      {
        model: Question ,
        as: "questions",
        include:[{
          model:Answer,
          as: "answers"
        }],
        
        attributes: ["id", "question", "category","difficulty","qtime","score","question_img"],
        through: {
          attributes: [],
        }
      }
    ],
  })
    .then(data => {
      res.send("test");
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tests."
      });
    });
};

//find test by id: 

exports.findOne = (req, res) => {
  const id = req.params.id;

  Test.findByPk(id ,{
    include: [
      {
        model: Question ,
        as: "questions",
        include:[{
          model:Answer,
          as: "answers"
        }],
        
        attributes: ["id", "question", "category","difficulty","qtime","score","question_img"],
        through: {
          attributes: [],
        }
      }
    ],
  } )
    .then(data => {
      res.send("2");
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Test with id=" + id
      });
    });
};

//add questions to a test

exports.addQuestions = (req, res) => {
  const testId = req.body.testId;
  const questionId = req.body.questionId;
  return Test.findByPk(testId)
    .then((test) => {
      if (!test) {
        console.log("test not found!");
        return null;
      }
      return Question.findByPk(questionId).then((question) => {
        if (!question) {
          console.log("question not found!");
          return null;
        }

        
        const testQuestion = {
          id_test: testId,
          id_question: questionId
        }
        TestQuestion.create(testQuestion).then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the testCategory."
          });
        });


      });
    })
    .catch((err) => {
      console.log(">> Error while adding question to Tag: ", err);
    });
};


//delete test 
exports.delete = (req, res) => {
  const id = req.params.id;

  Test.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Test was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Test with id=${id}. Maybe Test was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Test with id=" + id
      });
    });
};