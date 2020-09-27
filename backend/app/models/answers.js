/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('answers', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    field_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "checkbox"
    },
    answer_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    is_correct: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      comment: '0 is flase, 1 is correct, 2 needs admin'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    }
    
  }, {
    sequelize,
    tableName: 'answers'
  });
};
