const { db } = require('config')
const setupDataBase = require('./libs/conexion')
/*Models*/
const setupUserModel = require('./models/rh_apc_t_usua')
const setupRegionModel = require('./models/region')
const setupCountryModel = require('./models/country')
const setupVistaDatoEmpleadoModel = require('./models/fcb_v_dato_empl')
const setupRegistroAsistenciaModel = require('./models/apc_asis_per_ult')
const setupCabActividadTeleModel = require('./models/rh_apc_t_acti_tele')
const setupDetaActividadTeleModel = require('./models/rh_apc_t_deta_acti_tele')
const setupEmpleadoJefaturaModel = require('./models/apa_emp_jefe')
/*Libs*/
const setupUser = require('./libs/user')
const setupRegion = require('./libs/region')
const setupVistaDatoEmpleado = require('./libs/fcb_v_dato_empl')
const setupRegistroAsistencia = require('./libs/apc_asis_per_ult')
const setupCabActividadTele = require('./libs/rh_apc_acti_tele')
const setupEmpleadoJefatura = require('./libs/apa_emp_jefe')
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
  const RegionModel = setupRegionModel(config)
  const CountryModel = setupCountryModel(config)
  const VistaDatoEmpleadoModel = setupVistaDatoEmpleadoModel(config)
  const RegistroAsistenciaModel = setupRegistroAsistenciaModel(config)
  const CabActividadTeleModel = setupCabActividadTeleModel(config)
  const DetaActividadTeleModel = setupDetaActividadTeleModel(config)
  const EmpleadoJefaturaModel = setupEmpleadoJefaturaModel(config)

  /* RELATIONS MODELS */
  CabActividadTeleModel.hasMany(DetaActividadTeleModel, { foreignKey: 'ACTIVIDAD_ID', targetKey: 'ACTIVIDAD_ID' })
  /* CREATE LIBS*/
  const User = setupUser(UserModel, VistaDatoEmpleadoModel)
  const Region = setupRegion(RegionModel, CountryModel)
  const VistaDatoEmpleado = setupVistaDatoEmpleado(VistaDatoEmpleadoModel)
  const RegistroAsistencia = setupRegistroAsistencia(RegistroAsistenciaModel)
  const ActividadTele = setupCabActividadTele(CabActividadTeleModel, DetaActividadTeleModel, VistaDatoEmpleadoModel)
  const EmpleadoJefatura = setupEmpleadoJefatura(EmpleadoJefaturaModel)
  return {
    User,
    Region,
    VistaDatoEmpleado,
    RegistroAsistencia,
    ActividadTele,
    EmpleadoJefatura
  }
}
