const { v1 } = require('uuid')
const moment = require('moment')
const { QueryTypes } = require('sequelize-oracle')
module.exports = function setupCabActividadTele (CabActividadTeleModel, DetaActividadTeleModel) {

  function crearCabecera (model) {
    return new Promise(async (resolve, reject) => {
      const { rol, fechaInicio, fechaFin, rolJefatura } = model
      model.actividadId = v1()
      model.rolEmpleado = rol
      model.fechaInicio = moment(fechaInicio, 'DD/MM/YYYY').toDate()
      model.fechaFin = moment(fechaFin, 'DD/MM/YYYY').toDate()
      model.fechaCrea = moment().subtract(5, 'hours').toDate()
      model.estadoActividad = 'AC'
      model.rolAutorizador = rolJefatura
      CabActividadTeleModel.create(model).then(result => {
        const { actividadId, fechaInicio, fechaFin, rolJefatura } = result
        resolve({ actividadId, fechaInicio, fechaFin, rolJefatura })
      }).catch(e => {
        reject({ message: 'el rango de fechas es maximo de 7 dias y no se puede ingresar un dia que ya exista en el rango' })
      })

    })

  }

  function crearDetalle (model) {
    return new Promise(async (resolve, reject) => {
      const {
        actividadId, descripcionActividad, observacionActividad,
        productoDigitalEntregable, fechaInicio, fechaFin, avancePorcentaje, referenciaActividad
      } = model
      console.log('fecha', fechaInicio)
      model.detalleId = v1()
      model.actividadId = actividadId
      model.desdeDiaSemana = moment(fechaInicio).subtract(5, 'hours').toDate()
      model.hastaDiaSemana = moment(fechaFin).subtract(5, 'hours').toDate()
      model.descripcionActividad = descripcionActividad
      model.productoDigitalEntregable = productoDigitalEntregable
      model.avancePorcentaje = avancePorcentaje
      model.observacionActividad = observacionActividad
      model.referenciaActividad = referenciaActividad
      model.aprobacionJefatura = ''
      model.fechaAprobacion = ''
      DetaActividadTeleModel.create(model).then(result => {
        const { actividadId, descripcion, observacion, productoEntregable, fechaInicio, fechaFin, porcentajeAvance } = result
        resolve({ actividadId, descripcion, observacion, productoEntregable, fechaInicio, fechaFin, porcentajeAvance })
      })
    })
  }

  function updateDetalle (detalleId, model) {
    console.log(detalleId, model)
    const { fechaInicio, fechaFin } = model

    model.desdeDiaSemana = moment(fechaInicio).subtract(5, 'hours').toDate()
    model.hastaDiaSemana = moment(fechaFin).subtract(5, 'hours').toDate()

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

  function findAllCabActividades (ROL_EMPL) {
    return CabActividadTeleModel.findAll({
      where: {
        ROL_EMPL,
        estadoActividad: 'AC'
      }
    })
  }

  function findAllDetActividades (ACTIVIDAD_ID) {
    return DetaActividadTeleModel.findAll({
      where: { ACTIVIDAD_ID }
    })
  }

  // function deleteDetaActividad (detalleId) {
  //   console.log('delete lib', detalleId)
  //   return new Promise(async (resolve, reject) => {
  //     let instance = DetaActividadTeleModel.destroy({ where: { detalleId: detalleId } })
  //     if (instance) {
  //       console.log('ins', instance)
  //     } else {
  //       reject({ message: `user:${id} not found` })
  //     }
  //   })
  //   console.log(instance, 'jjj')
  // }

  function deleteDetaActividad (detalleId) {
    console.log('e', detalleId)
    return new Promise(async (resolve, reject) => {
      DetaActividadTeleModel.sequelize.query(`delete from RH_APC_T_DETA_ACTI_TELE where DETALLE_ID =  '${detalleId}' and ROWNUM = 1`, {
        type: QueryTypes.SELECT,
        plain: true
      }).then(resolve).catch(reject)
    })

  }

  return {
    crearCabecera,
    crearDetalle,
    findAllCabActividades,
    findAllDetActividades,
    updateDetalle,
    deleteDetaActividad
  }

}