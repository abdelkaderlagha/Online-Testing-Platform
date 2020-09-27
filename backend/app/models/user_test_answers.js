/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_test_answers', {
    user_login: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: {
          tableName: 'users',
        },
        key: 'login'
      }
    },
    test_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: {
          tableName: 'tests',
        },
        key: 'id'
      }
    },
    question_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    user_answers: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: 'contains ids sper by , if qcm, else contains user input'
    },
    time_left: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    is_correct: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: 3,
      comment: '0, wrong, 1 ok, 2, partialy correct3 needs admin'
    }
  }, {
    sequelize,
    tableName: 'user_test_answers'
  });
};
