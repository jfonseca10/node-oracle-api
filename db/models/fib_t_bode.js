const Sequelize = require('sequelize-oracle')
const setupDataBase = require('../libs/conexion')

module.exports = function setupBodegasModel (config) {
  const sequelize = setupDataBase(config)
  return sequelize.define('bodega', {
    idBodega: {
      field: 'CODI_BODE',
      primaryKey: true,
      type: Sequelize.STRING,
      allowNull: false
    },
    nombreBodega: {
      field: 'NOMB_BODE',
      type: Sequelize.STRING,
      allowNull: true
    },
    direccionBodega: {
      field: 'DIRE_BODE',
      type: Sequelize.STRING,
      allowNull: true
    },
    responsableBodega: {
      field: 'RESP_BODE',
      type: Sequelize.STRING,
      allowNull: true
    },
    fechaInicio: {
      field: 'FECH_INIC',
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    telefonoBodega: {
      field: 'TELE_BODE',
      type: Sequelize.STRING,
      allowNull: true
    },
    observacionBodega: {
      field: 'OBSE_BODE',
      type: Sequelize.STRING,
      allowNull: true
    },
    stsBodega: {
      field: 'STS_BODE',
      type: Sequelize.STRING,
      allowNull: true
    },
    fechaActual: {
      field: 'FECH_ACTU',
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    codigoUsuario: {
      field: 'CODI_USUA',
      type: Sequelize.STRING,
      allowNull: true
    },
    cuenCont: {
      field: 'CUEN_CONT',
      type: Sequelize.BIGINT,
      allowNull: true
    },
    tipoBodega: {
      field: 'TIPO_BODE',
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    tableName: 'FIB_T_BODE',
    timestamps: false
  })
}
