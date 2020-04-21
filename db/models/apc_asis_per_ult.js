const Sequelize = require('sequelize-oracle')
const setupDataBase = require('../libs/conexion')

module.exports = function setupRegistroAsistenciaModel (config) {
  const sequelize = setupDataBase(config)
  return sequelize.define('registroAsistencia', {
    rolUsuario: {
      field: 'ROL',
      primaryKey: true,
      type: Sequelize.STRING,
      allowNull: false
    },
    fechaHora: {
      field: 'FECHA_HORA',
      primaryKey: true,
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    tipoRegistro: {
      field: 'TIPO_REGISTRO',
      type: Sequelize.STRING,
      allowNull: false
    },
    generado: {
      field: 'GENERADO',
      type: Sequelize.STRING,
      allowNull: true
    },
    usuario: {
      field: 'USUARIO',
      type: Sequelize.STRING,
      allowNull: true
    },
    fechaAudicion: {
      field: 'FECHA_AUDI',
      type: Sequelize.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'APC_ASIS_PER',
    timestamps: false
  })

}