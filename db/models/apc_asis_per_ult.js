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
      allowNull: true
    },
    generado: {
      field: 'GENERADO',
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    tableName: 'APC_ASIS_PER_ULT',
    timestamps: false
  })

}