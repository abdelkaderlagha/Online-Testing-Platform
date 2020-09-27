/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tests', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ttime: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: 5400,
      comment: 'in sec : 1h30min'
    },
    needs_score: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: 1
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
    tableName: 'tests'
  });
};
