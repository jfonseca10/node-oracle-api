const Sequelize = require('sequelize-oracle')
const setupDataBase = require('../libs/conexion')

module.exports = function setupAutorizadoresModel (config) {
  const sequelize = setupDataBase(config)
  return sequelize.define('autorizadores', {
    codigoBodega: {
      field: 'CODI_BODE',
      primaryKey: true,
      type: Sequelize.STRING,
      allowNull: false
    },
    rolEmpleadoAutorizador: {
      field: 'ROL_EMPL_AUTO',
      primaryKey: true,
      type: Sequelize.STRING,
      allowNull: false
    },
    codigoProceso: {
      field: 'CODI_PROC',
      primaryKey: true,
      type: Sequelize.STRING,
      allowNull: false
    },
    nombreAutorizador: {
      field: 'NOMB_AUTO',
      type: Sequelize.STRING,
      allowNull: true
    },
    codigoUsuario: {
      field: 'CODI_USUA',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Código del usuario que crea o modifica'
    },
    fechaActual: {
      field: 'FECH_ACTU',
      type: Sequelize.DATEONLY,
      allowNull: true,
      comment: 'Fecha que crea o modifica'
    },
    fechaInicialVigencia: {
      field: 'FECH_INIC_VIGE',
      type: Sequelize.DATEONLY,
      allowNull: true,
      comment: 'Fecha inicial de la vigencia'
    },
    fechaFinVigencia: {
      field: 'FECH_FINA_VIGE',
      type: Sequelize.DATEONLY,
      allowNull: true,
      comment: 'Fecha final de la vigencia'
    },
    estadoActual: {
      field: 'ESTA_ACTU',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Estado actual A e I'
    },
    fechaHabilita: {
      field: 'FECH_HABI',
      type: Sequelize.DATEONLY,
      allowNull: true,
      comment: 'Fecha en la que se habilita'
    },
    fechaInhabilita: {
      field: 'FECH_INHA',
      type: Sequelize.DATEONLY,
      allowNull: true,
      comment: 'Fecha en la que se inhabilita'
    },
    anioAcutal: {
      field: 'ANO_ACTU',
      type: Sequelize.BIGINT,
      allowNull: true,
      comment: 'Año Vigente'
    }
  }, {
    tableName: 'FIB_T_AUTO',
    timestamps: false
  })

}