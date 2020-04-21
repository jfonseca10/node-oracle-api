const { v1 } = require('uuid')
const moment = require('moment')
const { fn, and  } = require('sequelize-oracle')

module.exports = function setupRegistroAsistencia (RegistroAsistenciaModel) {

  function crearEntrada (model) {
    return new Promise(async (resolve, reject) => {
      const { rol } = model
      model.rolUsuario = rol
      model.fechaHora = moment().subtract(5, 'hours').toDate()
      model.tipoRegistro = 'E'
      model.generado = 'T'
      RegistroAsistenciaModel.create(model).then(result => {
        const { rolUsuario, fechaHora, tipoRegistro, generado } = result
        resolve({ rolUsuario, fechaHora, tipoRegistro, generado })
      })

    })

  }

  function crearSalida (model) {
    return new Promise(async (resolve, reject) => {
      const { rol } = model
      model.rolUsuario = rol
      model.fechaHora = moment().subtract(5, 'hours').toDate()
      model.tipoRegistro = 'S'
      model.generado = 'T'
      RegistroAsistenciaModel.create(model).then(result => {
        const { rolUsuario, fechaHora, tipoRegistro, generado } = result
        resolve({ rolUsuario, fechaHora, tipoRegistro, generado })
      })

    })
  }

  function consultarAsistencias (model) {
    //const { rol, fechaInicio, fechaFin } = model
    //const fechaInicio = '13/04/2020';
    //const fechaFin = '14/04/2020';
    console.log('fechafin')
    const rol = '57559'
    const fechaInicio = moment().subtract(1, 'hours').toDate()
    const fechaFin = moment().subtract(9, 'hours').toDate()
    return RegistroAsistenciaModel.findAll(
      {
        where:
          {
            'rolUsuario': rol
          }
      }
    )
  }

  return {
    crearEntrada,
    crearSalida,
    consultarAsistencias
  }

}