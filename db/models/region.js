const Sequelize = require('sequelize-oracle')
const setupDataBase = require('../libs/conexion')

module.exports = function setupRegionModel (config) {
  const sequelize = setupDataBase(config)
  return sequelize.define('region', {
    regionID: {
      field: 'REGION_ID',
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    regionName: {
      field: 'REGION_NAME',
      type: Sequelize.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'REGIONS',
    timestamps: false,
  })
}