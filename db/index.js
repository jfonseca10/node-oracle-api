const { db } = require('config')
const setupDataBase = require('./libs/conexion')
/*Models*/
const setupUserModel = require('./models/user')
const setupCentroCostosModel = require('./models/apa_cen_cost')
const setupBodegasModel = require('./models/fib_t_bode')
/*Libs*/
const setupUser = require('./libs/user')
const setupCentroCostos = require('./libs/apa_cen_cost')
const setupBodegas = require('./libs/fib_t_bode')
module.exports = async function () {
  const config = {
    ...db.main,
    logging: console.log,
    query: {
      raw: true
    }
  }
  const sequelize = setupDataBase(config)
  await sequelize.authenticate()
  /* CREATE MODELS*/
  const UserModel = setupUserModel(config)
  const CentroCostosModel = setupCentroCostosModel(config)
  const BodegasModel = setupBodegasModel(config)
  /* CREATE LIBS*/
  const User = setupUser(UserModel)
  const CentroCostos = setupCentroCostos(CentroCostosModel)
  const Bodegas = setupBodegas(BodegasModel)
  return {
    User,
    CentroCostos,
    Bodegas
  }
}
