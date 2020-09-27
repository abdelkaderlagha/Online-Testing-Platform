const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const Test = db.tests;
const UserTests = db.user_tests;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.login) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a User
    const user = {
      login: req.body.login,
      pwd: req.body.pwd,
      urole: req.body.urole,
      email: req.body.email,
      prenom: req.body.prenom,
      nom: req.body.nom
      
    };
  
    // Save User in the database
    User.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
  };

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
   
    User.findAll({
      include: [
        {
          model: Test,
          as: "tests",
          attributes: ["id", "name", "category","ttime","needs_score"],
          through: {
            attributes: ["user_login", "test_id","test_date","test_status","score"],
          }
        },
      ],
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  };

// Find a single User with a name 
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    User.findByPk(id ,{
      include: [
        {
          model: Test,
          as: "tests",
          attributes: ["id", "name", "category","ttime","needs_score"],
          through: {
            attributes: ["user_login", "test_id","test_date","test_status","score"],
          }
        },
      ],
    } )
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
      });
  };

// Update a User by the name in the request
exports.update = (req, res) => {
    const login = req.params.login;
  
    User.update(req.body, {
      where: { login: login }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };

// Delete a User with the specified name in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    User.destroy({
      where: { login: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with name=" + id
        });
      });
  };



  //add tests to a user

  exports.addTests = (req, res) => {
    const testId = req.body.test_id;
    const userLogin = req.body.user_login;
    return User.findByPk(userLogin)
      .then((user) => {
        if (!user) {
          res.send({
            message: `user not fund`
          });
         
        }
        return Test.findByPk(testId).then((test) => {
          if (!test) {
            res.send({
              message: `test not fund`
            });
            
          }
  
          
          const userTest = {
            test_id: testId,
            user_login: userLogin,
            test_date: req.body.test_date,
            test_status: req.body.test_status,
            score:req.body.score
          }
          UserTests.create(userTest).then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the userTest."
            });
          });
  
  
        });
      })
      .catch((err) => {
        console.log(">> Error while adding question to Tag: ", err);
      });
  };


  // Retrieve all Users from the database.
exports.findAllUserTests = (req, res) => {
    
  UserTests.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  };
