const Sequelize = require('sequelize-oracle')
const setupDataBase = require('../libs/conexion')

module.exports = function setupCountryModel (config) {
  const sequelize = setupDataBase(config)
  return sequelize.define('country', {
    id: {
      field: 'COUNTRY_ID',
      primaryKey: true,
      type: Sequelize.STRING,
      allowNull: false,
    },
    countryName: {
      field: 'COUNTRY_NAME',
      type: Sequelize.STRING,
      allowNull: true,
    },
    regionID: {
      field: 'REGION_ID',
      type: Sequelize.INTEGER,
      allowNull: true,
    }
  }, {
    tableName: 'COUNTRIES',
    timestamps: false,
  })
}