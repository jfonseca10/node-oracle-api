const Sequelize = require('sequelize-oracle')
const setupDataBase = require('../libs/conexion')

module.exports = function setupSolicitudesModel (config) {
  const sequelize = setupDataBase(config)
  return sequelize.define('solicitudes', {
    solicitudBodegaNum: {
      field: 'SOLI_BODE',
      primaryKey: true,
      type: Sequelize.BIGINT,
      allowNull: false,
      comment: 'Número de la solicitud'
    },
    codigoTipoDocumento: {
      field: 'CODI_TIPO_DOCU',
      type: Sequelize.STRING,
      allowNull: false,
      comment: 'Código tipo de documento'
    },
    codigoBodega: {
      field: 'CODI_BODE',
      primaryKey: true,
      type: Sequelize.STRING,
      allowNull: false,
      comment: 'Código de Bodega'
    },
    codigoProyecto: {
      field: 'CODI_PROY',
      type: Sequelize.BIGINT,
      allowNull: true,
      comment: 'Código de Proyecto'
    },
    centroCosto: {
      field: 'CENT_COST',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Centro de Costo'
    },
    usoSolicitud: {
      field: 'USO_SOLI',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Código Para usarse en'
    },
    observacionSolicitud: {
      field: 'OBSE_SOLI',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Observaciones de la solicitud'
    },
    fechaActual: {
      field: 'FECH_ACTU',
      type: Sequelize.DATEONLY,
      allowNull: false,
      comment: 'Fecha de creación'
    },
    codigoUsuario: {
      field: 'CODI_USUA',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Código de usuario'
    },
    rolSolicitante: {
      field: 'ROL_EMPL_SOLI',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Rol solicitante'
    },
    rolAutorizador: {
      field: 'ROL_EMPL_AUTO',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Rol autorizador'
    },
    rucContratista: {
      field: 'CEDU_RUC',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Ruc contratista'
    },
    estado: {
      field: 'ESTADO',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'estado'
    },
    numeroEgreso: {
      field: 'NUME_EGRE',
      type: Sequelize.BIGINT,
      allowNull: true,
    },
    codigoSts: {
      field: 'CODI_STS',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Estado'
    },
    nombreSolicitante: {
      field: 'NOMB_SOLI',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Nombre solicitante'
    },
    nombreAutorizador: {
      field: 'NOMB_AUTO',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Nombre autorizador'
    },
    codigoEgreso: {
      field: 'CODI_EGRE',
      type: Sequelize.BIGINT,
      allowNull: true,
      comment: 'Código de egreso'
    },
    partidaPresupuestaria: {
      field: 'PART_PRES',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Partida presupuestaria'
    },
    ordenTrabajo: {
      field: 'ORDE_TRAB',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Orden de Trabajo'
    },
    usos: {
      field: 'USOS',
      type: Sequelize.BIGINT,
      allowNull: true,
      comment: 'Para usarse en'
    },
    localizacionEspe: {
      field: 'LOCA_ESPE',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Localización'
    },
    numeroSolicitud: {
      field: 'NUME_SOLI',
      type: Sequelize.BIGINT,
      allowNull: true
    },
    codigoProc: {
      field: 'CODI_PROC',
      type: Sequelize.STRING,
      allowNull: true
    },
    codigoGerencia: {
      field: 'CODI_GERE',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Código de Gerencia'
    },
    direccionIp: {
      field: 'DIRE_IP',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Dirección IP desde donde se realiza la solicitud'
    },
    nombreHost: {
      field: 'NOMB_HOST',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Nombre máquina desde donde se realiza la solicitud'
    },
    fechaAutoriza: {
      field: 'FECH_AUTO',
      type: Sequelize.DATEONLY,
      allowNull: true,
      comment: 'Fecha en la que se autoriza la Solicitud'
    },
    direccionIpAutorizador: {
      field: 'DIRE_IP_AUTO',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Dirección IP desde donde se autoriza la solicitud'
    },
    nombreHostAutorizador: {
      field: 'NOMB_HOST_AUTO',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Nombre máquina desde donde se autoriza la solicitud'
    },
    anioSolicitud: {
      field: 'ANO_SOLI',
      type: Sequelize.BIGINT,
      allowNull: true,
      comment: 'Año de la Solicitud'
    },
    motivoAnulacion: {
      field: 'MOTI_ANUL',
      type: Sequelize.STRING,
      allowNull: true,
      comment: 'Motivo de la Anulación'
    }
  }, {
    tableName: 'FIB_T_SOLIS',
    timestamps: false
  })

}