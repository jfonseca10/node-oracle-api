const Sequelize = require('sequelize-oracle')
const setupDataBase = require('../libs/conexion')

module.exports = function setupAutorizadoresModel (config) {
  const sequelize = setupDataBase(config)
  return sequelize.define('detalleSolicitudes', {
    solicitudBodega: {
      field: 'SOLI_BODE',
      primaryKey: true,
      type: Sequelize.BIGINT,
      allowNull: false,
      comment: 'Número de Solicitud de Egreso de Bodega'
    },
    codigoTipoDocumento: {
      field: 'CODI_TIPO_DOCU',
      type: Sequelize.STRING,
      allowNull: false,
      comment: 'Tipo de Documento'
    },
    codigoMaterial: {
      field: 'CODI_MATE',
      primaryKey: true,
      type: Sequelize.BIGINT,
      allowNull: false,
      comment: 'Código de material'
    },
    codigoBodega: {
      field: 'CODI_BODE',
      primaryKey: true,
      type: Sequelize.STRING,
      allowNull: false,
      comment: 'Código de Bodega'
    },
    cantidadMaterialSolicitada: {
      field: 'CANT_MATE_SOLI',
      type: Sequelize.BIGINT,
      allowNull: false,
      comment: 'Cantidad de material solicitada'
    },
    valorUnitario: {
      field: 'VALO_UNIT_USUA',
      type: Sequelize.BIGINT,
      allowNull: true,
      comment: 'Valor unitario'
    },
    stsEgre: {
      field: 'STS_EGRE',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Estado'
    },
    codigoSts: {
      field: 'CODI_STS',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Estado de la solicitud'
    },
    fechaActualCreacion: {
      field: 'FECH_ACTU',
      type: Sequelize.DATEONLY,
      allowNull: true,
      comment: 'Fecha de creación'
    },
    codigoUsuario: {
      field: 'CODI_USUA',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Código de usuario'
    },
    conceptoGasto: {
      field: 'CONC_GAST',
      type: Sequelize.BIGINT,
      allowNull: true,
      comment: 'Concepto de gasto'
    },
    observacionItem: {
      field: 'OBSE_ITEM',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Observaciones del item'
    },
    numeroEgreso: {
      field: 'NUME_EGRE',
      type: Sequelize.BIGINT,
      allowNull: true
    },
    codigoProy: {
      field: 'CODI_PROY',
      type: Sequelize.BIGINT,
      allowNull: true
    },
    descMateUsua: {
      field: 'DESC_MATE_USUA',
      type: Sequelize.STRING,
      allowNull: true
    },
    codigoEeq: {
      field: 'CODI_EEQ',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Código EEQ'
    },
    motivoAnulacion: {
      field: 'MOTI_ANUL',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Motivo de la Anulación'
    }
  }, {
    tableName: 'FIB_T_DETA_SOLIS',
    timestamps: false
  })
}