const { v1 } = require('uuid')

module.exports = function setupActividades (ActividadesModel) {
  function findAllActividades () {
    return ActividadesModel.findAll()
  }

  function create (model) {
    return new Promise(async (resolve, reject) => {
      const { descripcion, observacion, productoEntregable, fechaInicio, fechaFin, porcentajeAvance } = model
      console.log('este es la actividad enviada: ', fechaInicio)
      model.idActividad = v1()
      model.idUsuario = '058f4010-79bf-11ea-91a1-5fcce5a209d7'
      model.descripcionActividad = descripcion
      model.observaciones = observacion
      model.productoEntregable = productoEntregable
      model.fechaHoraInicio = fechaInicio
      model.fechaHoraFin = fechaFin
      model.avancePorcentaje = porcentajeAvance
      ActividadesModel.create(model).then(result => {
        const { id, descripcionActividad } = result
        resolve({ id, descripcionActividad })
      })

    })

  }

  return {
    findAllActividades,
    create
  }

}