/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('questions', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: {
          tableName: 'categories',
        },
        key: 'name'
      }
    },
    difficulty: {
      type: DataTypes.ENUM('easy','medium','expert'),
      allowNull: false,
      defaultValue: "medium"
    },
    qtime: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 30,
      comment: 'in secs'
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 1
    },
    question_img: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    is_enabled: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'questions'
  });
};
