/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_tests', {
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
    test_date: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    },
    test_status: {
      type: DataTypes.ENUM('pending','progress','finished'),
      allowNull: false,
      defaultValue: "pending"
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'user_tests'
  });
};
