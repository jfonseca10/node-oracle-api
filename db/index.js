const { db } = require('config')
const setupDataBase = require('./libs/conexion')
/*Models*/
const setupUserModel = require('./models/user')
const setupCentroCostosModel = require('./models/apa_cen_cost')
const setupBodegasModel = require('./models/fib_t_bode')
const setupAutorizadoresModel = require('./models/fib_t_auto')
const setupSolicitudesModel = require('./models/fib_t_solis')
const setupDetalleSolicitudesModel = require('./models/fib_t_deta_solis')
/*Libs*/
const setupUser = require('./libs/user')
const setupCentroCostos = require('./libs/apa_cen_cost')
const setupBodegas = require('./libs/fib_t_bode')
const setupAutorizadores = require('./libs/fib_t_auto')
const setupSolicitudes = require('./libs/fib_t_solis')
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
  const AutorizadoresModel = setupAutorizadoresModel(config)
  const SolicitudesModel = setupSolicitudesModel(config)
  const DetalleSolicitudesModel = setupDetalleSolicitudesModel(config)
  /* CREATE LIBS*/
  const User = setupUser(UserModel)
  const CentroCostos = setupCentroCostos(CentroCostosModel)
  const Bodegas = setupBodegas(BodegasModel)
  const Autorizadores = setupAutorizadores(AutorizadoresModel)
  const Solicitudes = setupSolicitudes(SolicitudesModel, DetalleSolicitudesModel)
  return {
    User,
    CentroCostos,
    Bodegas,
    Autorizadores,
    Solicitudes
  }
}
