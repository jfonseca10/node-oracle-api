const Sequelize = require('sequelize-oracle')
const setupDataBase = require('../libs/conexion')

module.exports = function setupUserModel (config) {
  const sequelize = setupDataBase(config)
  return sequelize.define('user', {
    id: {
      field: 'USUA_ID',
      primaryKey: true,
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      field: 'NOMB_COMP',
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      field: 'EMAI_USUA',
      type: Sequelize.STRING,
      allowNull: false
    },
    rol: {
      field: 'ROL',
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      field: 'PASS_USUA',
      type: Sequelize.STRING,
      allowNull: false
    },
    resetPasswordCode: {
      field: 'RESE_PASS_CODE',
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    tableName: 'RH_APC_T_USUA',
    timestamps: false
  })

}
