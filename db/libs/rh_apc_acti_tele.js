const { v1 } = require('uuid')
const moment = require('moment')
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
      const { actividadId, descripcion, observacion, productoEntregable, fechaInicio, fechaFin, porcentajeAvance, referencia } = model
      console.log('fecha', fechaInicio)
      model.detalleId = v1()
      model.actividadId = actividadId
      model.desdeDiaSemana = moment(fechaInicio).subtract(5, 'hours').toDate()
      model.hastaDiaSemana = moment(fechaFin).subtract(5, 'hours').toDate()
      model.descripcionActividad = descripcion
      model.productoDigitalEntregable = productoEntregable
      model.avancePorcentaje = porcentajeAvance
      model.observacionActividad = observacion
      model.referenciaActividad = referencia
      model.aprobacionJefatura = ''
      model.fechaAprobacion = ''
      DetaActividadTeleModel.create(model).then(result => {
        const { actividadId, descripcion, observacion, productoEntregable, fechaInicio, fechaFin, porcentajeAvance } = result
        resolve({ actividadId, descripcion, observacion, productoEntregable, fechaInicio, fechaFin, porcentajeAvance })
      })
    })
  }

  function updateDetalle (detall, model) {
    console.log('update', detall)
    console.log('update1', model)
    //promesa para retornar codigo asincrono , consiste en 2 funciones : response, reject
    return new Promise(async (resolve, reject) => {
      let instance = await DetaActividadTeleModel.findAll({
        where: { detalleId: 'd8a5fdc0-801f-11ea-96aa-cf1a5859de9d' }
      })

      console.log('eee', instance)
      if (instance) {
        DetaActividadTeleModel.update(model, { where: { detalleId: 'd8a5fdc0-801f-11ea-96aa-cf1a5859de9d' } }).then(resolve).catch(reject)
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

  return {
    crearCabecera,
    crearDetalle,
    findAllCabActividades,
    findAllDetActividades,
    updateDetalle
  }

}