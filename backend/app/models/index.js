const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.answers = require("./answers.js")(sequelize, Sequelize);
db.categories = require("./categories.js")(sequelize, Sequelize);
db.questions = require("./questions.js")(sequelize, Sequelize);
db.test_questions = require("./test_questions.js")(sequelize, Sequelize);
db.tests = require("./tests.js")(sequelize, Sequelize);
db.user_test_answers = require("./user_test_answers.js")(sequelize, Sequelize);
db.user_tests = require("./user_tests.js")(sequelize, Sequelize);
db.users = require("./users.js")(sequelize, Sequelize);


//relationships:


db.questions.hasMany(db.answers, {as: "answers"});
db.answers.belongsTo(db.questions,{
  foreignKey:'questionId',
  as:'question'
})

db.tests.belongsToMany(db.questions,{as:'questions', through:'test_questions', foreignKey:'id_test' , otherKey:'id_question'})
db.questions.belongsToMany(db.tests,{as:'tests', through:'test_questions', foreignKey:'id_question' , otherKey:'id_test'})

db.tests.belongsToMany(db.users,{as:'users', through:'user_tests', foreignKey:'test_id' , otherKey:'user_login'})
db.users.belongsToMany(db.tests,{as:'tests', through:'user_tests', foreignKey:'user_login' , otherKey:'test_id'})





module.exports = db;