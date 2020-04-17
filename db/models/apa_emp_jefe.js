const Sequelize = require('sequelize-oracle')
const setupDataBase = require('../libs/conexion')

module.exports = function setupEmpleadoJefaturaModel (config) {
  const sequelize = setupDataBase(config)
  return sequelize.define('empleadoJefatura', {
    rolEmpleado: {
      field: 'ROL_EMP',
      primaryKey: true,
      type: Sequelize.STRING,
      allowNull: false
    },
    rolJefatura: {
      field: 'ROL_JEFE',
      type: Sequelize.STRING,
      allowNull: true
    },
    rolDivi: {
      field: 'ROL_DIVI',
      type: Sequelize.STRING,
      allowNull: true
    },
    rolJefeReemplazo: {
      field: 'ROL_JEFE_REEMP',
      type: Sequelize.STRING,
      allowNull: true
    },
    fechaVigencia: {
      field: 'FECHA_VIGENCIA',
      type: Sequelize.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'APA_EMP_JEFE',
    timestamps: false
  })

}