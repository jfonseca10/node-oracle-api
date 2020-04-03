const Sequelize = require('sequelize-oracle')
const setupDataBase = require('../libs/conexion')

module.exports = function setupUserModel (config) {
  const sequelize = setupDataBase(config)
  return sequelize.define('user', {
    id: {
      field: 'ID',
      primaryKey: true,
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      field: 'NAME',
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      field: 'EMAIL',
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
      field: 'USERNAME',
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      field: 'PASSWORD',
      type: Sequelize.STRING,
      allowNull: false
    },
    resetPasswordCode: {
      field: 'RESET_PASSWORD_CODE',
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    tableName: 'DEV_USER',
    timestamps: false
  })

}
