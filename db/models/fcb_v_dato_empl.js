const Sequelize = require('sequelize-oracle')
const setupDataBase = require('../libs/conexion')

module.exports = function (config) {
  const sequelize = setupDataBase(config)

  return sequelize.define('vDatoEmpleados', {
    rolEmpleado: {
      field: 'ROL_EMPL',
      type: Sequelize.STRING,
      primaryKey: true
    },
    nombreEmpleado: {
      field: 'NOMB_EMPL',
      type: Sequelize.STRING
    },
    primerApellido: {
      field: 'P_APELLIDO',
      type: Sequelize.STRING
    },
    segundoApellido: {
      field: 'S_APELLIDO',
      type: Sequelize.STRING
    },
    nombres: {
      field: 'NOMBRES',
      type: Sequelize.STRING
    },
    centroCosto: {
      field: 'CENT_COST',
      type: Sequelize.STRING
    },
    lugarTrabajo: {
      field: 'LUG_TRABAJO',
      type: Sequelize.STRING
    },
    condicion: {
      field: 'CONDICION',
      type: Sequelize.STRING
    },
    cedula: {
      field: 'CEDULA',
      type: Sequelize.STRING
    },
    empleadoEmail: {
      field: 'E_MAIL',
      type: Sequelize.STRING
    },
    banco: {
      field: 'BANCO',
      type: Sequelize.STRING
    },
    habilitado: {
      field: 'HABILITADO',
      type: Sequelize.STRING
    },
    fechaNacimiento: {
      field: 'FEC_NACIMIE',
      type: Sequelize.DATEONLY
    },
    direccion: {
      field: 'DIRECCION',
      type: Sequelize.STRING
    },
    telefono: {
      field: 'TELEFONO',
      type: Sequelize.STRING
    },
    fechaIngreso: {
      field: 'FEC_INGRESO',
      type: Sequelize.DATEONLY
    },
    fechaSalida: {
      field: 'FEC_SALIDA',
      type: Sequelize.DATEONLY
    },
    clasePuesto: {
      field: 'CLAS_PUESTO',
      type: Sequelize.STRING
    }
  }, {
    tableName: 'fcb_v_dato_empl',
    timestamps: false
  })

}