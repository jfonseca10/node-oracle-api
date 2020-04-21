const Sequelize = require('sequelize-oracle')
const setupDataBase = require('../libs/conexion')

module.exports = function setupDetaActividadTeleModel (config) {
  const sequelize = setupDataBase(config)
  return sequelize.define('detalleActividad', {
      detalleId: {
        field: 'DETALLE_ID',
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false
      },
      actividadId: {
        field: 'ACTIVIDAD_ID',
        type: Sequelize.STRING,
        allowNull: false
      },
      desdeDiaSemana: {
        field: 'DESD_DIA_SEMA',
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      hastaDiaSemana: {
        field: 'HAST_DIA_SEMA',
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      descripcionActividad: {
        field: 'DESC_ACTI',
        type: Sequelize.STRING,
        allowNull: true
      },
      productoDigitalEntregable: {
        field: 'PROD_ENTR',
        type: Sequelize.STRING,
        allowNull: true
      },
      avancePorcentaje: {
        field: 'AVAN_PORC',
        type: Sequelize.STRING,
        allowNull: true
      },
      aprobacionJefatura: {
        field: 'APRO_JEFA',
        type: Sequelize.STRING,
        allowNull: true
      },
      observacionActividad: {
        field: 'OBSE_ACTI',
        type: Sequelize.STRING,
        allowNull: true
      },
      referenciaActividad: {
        field: 'REFE_ACTI',
        type: Sequelize.STRING,
        allowNull: true
      },
      fechaAprobacion: {
        field: 'FECH_APROB',
        type: Sequelize.DATEONLY,
        allowNull: true
      }
    }, {
      tableName: 'RH_APC_T_DETA_ACTI_TELE',
      timestamps: false

    }
  )

}