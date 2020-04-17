const Sequelize = require('sequelize-oracle')
const setupDataBase = require('../libs/conexion')

module.exports = function setupActividadesModel (config) {
  const sequelize = setupDataBase(config)
  return sequelize.define('actividades', {
    idActividad: {
      field: 'ACTI_ID',
      primaryKey: true,
      type: Sequelize.STRING,
      allowNull: false
    },
    idUsuario: {
      field: 'USUA_ID',
      type: Sequelize.STRING,
      allowNull: false
    },
    descripcionActividad: {
      field: 'DESC_ACTI',
      type: Sequelize.STRING,
      allowNull: true
    },
    fechaHoraInicio: {
      field: 'FECH_HORA_INICIO',
      type: Sequelize.STRING,
      allowNull: true
    },
    fechaHoraFin: {
      field: 'FECH_HORA_FIN',
      type: Sequelize.STRING,
      allowNull: true
    },
    productosEntregables: {
      field: 'PROD_DIGI_ENTREGABLES',
      type: Sequelize.STRING,
      allowNull: true
    },
    avancePorcentaje: {
      field: 'AVAN_PORC',
      type: Sequelize.STRING,
      allowNull: true
    },
    observaciones: {
      field: 'OBSE',
      type: Sequelize.STRING,
      allowNull: true
    },
    estado: {
      field: 'ESTA',
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    tableName: 'RH_CRA_T_ACTI',
    timestamps: false
  })

}