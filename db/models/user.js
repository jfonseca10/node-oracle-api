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
    lastName: {
      field: 'LAST_NAME',
      type: Sequelize.STRING,
      allowNull: true
    },
    username: {
      field: 'USERNAME',
      type: Sequelize.STRING,
      allowNull: true
    },
    password: {
      field: 'PASSWORD',
      type: Sequelize.STRING,
      allowNull: true
    },
  }, {
    tableName: 'DEV_USER',
    timestamps: false
  })

}
