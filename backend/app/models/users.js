/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    login: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    pwd: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    urole: {
      type: DataTypes.ENUM('admin','user'),
      allowNull: false,
      defaultValue: "user"
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
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    prenom: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users'
  });
};
