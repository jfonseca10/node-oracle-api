const Sequelize = require('sequelize-oracle')
const setupDataBase = require('../libs/conexion')

module.exports = function setupCentroCostosModel (config) {
  const sequelize = setupDataBase(config)
  return sequelize.define('centroCostos', {
      idCenCosto: {
        field: 'CEN_COSTO',
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false
      },
      descripcion: {
        field: 'DESCRIPCION',
        type: Sequelize.STRING,
        allowNull: true
      },
      enviaPro: {
        field: 'ENVIA_PRO',
        type: Sequelize.STRING,
        allowNull: true
      },
      porcentajeExp: {
        field: 'PORCENTAJE_EXP',
        type: Sequelize.BIGINT,
        allowNull: true
      },
      tlfDir: {
        field: 'TLF_DIR',
        type: Sequelize.STRING,
        allowNull: true
      },
      tlfTron: {
        field: 'TLF_TRON',
        type: Sequelize.STRING,
        allowNull: true
      },
      tlfExt: {
        field: 'TLF_EXT',
        type: Sequelize.STRING,
        allowNull: true
      },
      nivel: {
        field: 'NIVEL',
        type: Sequelize.STRING,
        allowNull: true
      },
      estado: {
        field: 'ESTADO',
        type: Sequelize.STRING,
        allowNull: true
      },
      areaConoc: {
        field: 'AREA_CONOC',
        type: Sequelize.STRING,
        allowNull: true
      },
      etapa: {
        field: 'ETAPA',
        type: Sequelize.BIGINT,
        allowNull: true
      },
      costoPadre: {
        field: 'COSTO_PADRE',
        type: Sequelize.STRING,
        allowNull: true
      },
      costoDire: {
        field: 'COSTO_DIRE',
        type: Sequelize.STRING,
        allowNull: true
      },
      costoGere: {
        field: 'COSTO_GERE',
        type: Sequelize.STRING,
        allowNull: true
      }
    },
    {
      tableName: 'APA_CEN_COST',
      timestamps: false
    })

}
