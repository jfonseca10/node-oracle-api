const { v1 } = require('uuid')
const moment = require('moment')
const { QueryTypes } = require('sequelize-oracle')
module.exports = function setupCabActividadTele (CabActividadTeleModel, DetaActividadTeleModel) {

  function crearCabecera (model) {
    return new Promise(async (resolve, reject) => {
      const { rol, name, fechaInicio, fechaFin, rolJefatura } = model
      model.actividadId = v1()
      model.rolEmpleado = rol
      model.fechaInicio = moment(fechaInicio, 'DD/MM/YYYY').toDate()
      model.fechaFin = moment(fechaFin, 'DD/MM/YYYY').toDate()
      model.fechaCrea = moment().subtract(5, 'hours').toDate()
      model.estadoActividad = 'AC'
      model.rolAutorizador = rolJefatura
      model.nombreCompleto = name
      model.centroCosto = ''
      CabActividadTeleModel.create(model).then(result => {
        const { actividadId, fechaInicio, fechaFin, rolJefatura, fechaCrea, estadoActividad, rolAutorizador, nombreCompleto, centroCosto } = result
        resolve({
          actividadId,
          fechaInicio,
          fechaFin,
          rolJefatura,
          fechaCrea,
          estadoActividad,
          rolAutorizador,
          nombreCompleto,
          centroCosto
        })
      }).catch(e => {
        reject({ message: 'el rango de fechas es maximo de 7 dias y no se puede ingresar un dia que ya exista en el rango' })
      })

    })

  }

  function crearDetalle (model) {
    console.log('ingrso a', model)
    return new Promise(async (resolve, reject) => {
      const {
        actividadId, descripcionActividad, observacionActividad,
        productoDigitalEntregable, fechaInicio, avancePorcentaje, referenciaActividad
      } = model
      console.log('fecha', fechaInicio)
      model.detalleId = v1()
      model.actividadId = actividadId
      model.diaSemana = moment(fechaInicio).subtract(5, 'hours').toDate()
      model.descripcionActividad = descripcionActividad
      model.productoDigitalEntregable = productoDigitalEntregable
      model.avancePorcentaje = avancePorcentaje
      model.observacionActividad = observacionActividad
      model.referenciaActividad = referenciaActividad
      model.aprobacionJefatura = ''
      model.fechaAprobacion = ''
      DetaActividadTeleModel.create(model).then(result => {
        const { actividadId, descripcion, observacion, productoEntregable, fechaInicio, porcentajeAvance } = result
        resolve({ actividadId, descripcion, observacion, productoEntregable, fechaInicio, porcentajeAvance })
      })
    })
  }

  function updateDetalle (detalleId, model) {
    const { fechaInicio } = model
    model.diaSemana = moment(fechaInicio).subtract(5, 'hours').toDate()
    console.log(model)
    //promesa para retornar codigo asincrono , consiste en 2 funciones : response, reject
    return new Promise(async (resolve, reject) => {
      let instance = await DetaActividadTeleModel.findOne({
        where: { detalleId }
      })
      if (instance) {
        DetaActividadTeleModel.update(model, { where: { detalleId } }).then(resolve).catch(reject)
      } else {
        reject({ message: `user:${id} not found` })
      }
    })
  }

  function updateDetalleAutorizador (detalleId, model) {
    model.fechaAprobacion = moment().subtract(5, 'hours').toDate()
    const { fechaAprobacion, aprobacionJefatura, actividadId } = model
    //promesa para retornar codigo asincrono , consiste en 2 funciones : response, reject
    return new Promise(async (resolve, reject) => {
      let instance = await DetaActividadTeleModel.findOne({
        where: { detalleId }
      })
      if (instance) {
        DetaActividadTeleModel
          .update({ aprobacionJefatura, fechaAprobacion }, {
            where: { detalleId },
            type: QueryTypes.RAW
          })
          .then(async () => {
            const pentA = await DetaActividadTeleModel.count({ where: { actividadId, aprobacionJefatura: null } })
            console.log('numero',pentA)
            if (pentA === 0) {
              CabActividadTeleModel.update({ estadoActividad: 'AP' }, { where: { actividadId } })
                .then(() => {
                  resolve({ success: true })
                })
            } else {
              resolve({ success: true })
            }
          }).catch(reject)
      } else {
        reject({ message: `ok` })
      }
    })
  }

  function findAllCabActividades (ROL_EMPL) {
    return CabActividadTeleModel.findAll({
      where: {
        ROL_EMPL,
        estadoActividad: 'AC'
      }
    })
  }

  function findAllCabActiAutorizador (ROL_AUTO) {
    return CabActividadTeleModel.findAll({
      where: {
        ROL_AUTO,
        estadoActividad: 'AC'
      }
    })
  }

  function findAllDetActividades (actividadId) {
    return DetaActividadTeleModel.findAll({
      where: {
        actividadId
      }
    })
  }

  function findAllDetActividadesAutorizador (actividadId) {
    return DetaActividadTeleModel.findAll({
      where: {
        actividadId, aprobacionJefatura: null, fechaAprobacion:null
      }
    })
  }

  function deleteDetaActividad (detalleId) {
    console.log('e', detalleId)
    return new Promise(async (resolve, reject) => {
      DetaActividadTeleModel.sequelize.query(`delete from RH_APC_T_DETA_ACTI_TELE where DETALLE_ID =  '${detalleId}'`, {
        type: QueryTypes.DELETE,
        plain: true,
        raw: true
      }).then(resolve).catch(reject)
    })

  }

  return {
    crearCabecera,
    crearDetalle,
    findAllCabActividades,
    findAllDetActividades,
    findAllCabActiAutorizador,
    findAllDetActividadesAutorizador,
    updateDetalle,
    updateDetalleAutorizador,
    deleteDetaActividad
  }

}