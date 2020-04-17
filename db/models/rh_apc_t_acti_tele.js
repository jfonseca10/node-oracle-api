const Sequelize = require('sequelize-oracle')
const setupDataBase = require('../libs/conexion')

module.exports = function setupCabActividadTeleModel (config) {
  const sequelize = setupDataBase(config)
  return sequelize.define('cabeceraActividad', {
    actividadId: {
      field: 'ACTIVIDAD_ID',
      primaryKey: true,
      type: Sequelize.STRING,
      allowNull: false
    },
    rolEmpleado: {
      field: 'ROL_EMPL',
      type: Sequelize.STRING,
      allowNull: true
    },
    fechaInicio: {
      field: 'FECH_INIC',
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    fechaFin: {
      field: 'FECH_FINA',
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    fechaCrea: {
      field: 'FECH_CREA',
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    estadoActividad: {
      field: 'ESTA_ACTI',
      type: Sequelize.STRING,
      allowNull: true
    },
    rolAutorizador: {
      field: 'ROL_AUTO',
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    tableName: 'RH_APC_T_ACTI_TELE',
    timestamps: false
  })

}