const { v1 } = require('uuid')
const moment = require('moment')
const { QueryTypes } = require('sequelize-oracle')
module.exports = function setupCabActividadTele (CabActividadTeleModel, DetaActividadTeleModel, VistaDatoEmpleadoModel) {

  function crearCabecera (model) {
    return new Promise(async (resolve, reject) => {
      const fechaAnio = moment().toDate().getFullYear()
      const fechaMes = moment().add('1', 'month').toDate().getMonth()
      const fechaMesAnio = fechaMes + '' + fechaAnio
      const { rol, name, fechaInicio, fechaFin, rolJefatura, CENT_COST } = model
      model.actividadId = v1()
      model.rolEmpleado = rol
      model.fechaInicio = moment(fechaInicio, 'DD/MM/YYYY').toDate()
      model.fechaFin = moment(fechaFin, 'DD/MM/YYYY').toDate()
      model.fechaCrea = moment().subtract(5, 'hours').toDate()
      model.estadoActividad = 'AC'
      model.rolAutorizador = rolJefatura
      model.nombreCompleto = name
      model.centroCosto = CENT_COST
      model.mesAnio = fechaMesAnio
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
    return new Promise(async (resolve, reject) => {
      const {
        actividadId, descripcionActividad, observacionActividad,
        productoDigitalEntregable, fechaInicio, avancePorcentaje, referenciaActividad
      } = model
      model.detalleId = v1()
      model.actividadId = actividadId
      model.diaSemana = moment(fechaInicio).subtract(5, 'hours').toDate()
      model.descripcionActividad = descripcionActividad
      model.productoDigitalEntregable = productoDigitalEntregable
      model.avancePorcentaje = avancePorcentaje
      model.observacionActividad = observacionActividad
      model.referenciaActividad = referenciaActividad
      model.aprobacionJefatura = 'AC'
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
    model.aprobacionJefatura = 'AA'
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

  function updateCabEnviarSemana (actividadId, model) {
    const { rolAutorizador, rolEmpleado, nombreCompleto } = model
    return new Promise(async (resolve, reject) => {
      let instance = await CabActividadTeleModel.findOne({
        where: { actividadId }
      })
      let emailAutorizador = await VistaDatoEmpleadoModel.sequelize.query(`select E_MAIL from fcb_v_dato_empl where ROL_EMPL = '${rolAutorizador}'`, {
        type: QueryTypes.SELECT,
        plain: true
      })
      let emailSolicitante = await VistaDatoEmpleadoModel.sequelize.query(`select E_MAIL from fcb_v_dato_empl where ROL_EMPL = '${rolEmpleado}'`, {
        type: QueryTypes.SELECT,
        plain: true
      })
      const { E_MAIL: emailAutoriza } = emailAutorizador
      const { E_MAIL: emailSolicita } = emailSolicitante

      if (instance) {
        CabActividadTeleModel.update({ estadoActividad: 'SE' }, { where: { actividadId } }).then(() => {
          VistaDatoEmpleadoModel.sequelize.query(`BEGIN sendmail('${emailAutoriza}','${emailSolicita}','Postmaster@eeq.com.ec','Sistema de control de asistencias y registro de actividades','${nombreCompleto} le ha enviado actividades para su aprobacion.'); END; `).then(() => {
            resolve({ success: true })
          })

        })

      } else {
        reject({ message: `no hay cabecera para enviar` })
      }

    })

  }

  function updateCabDevolverActi (actividadId, model) {
    const { rolAutorizador, rolEmpleado, nombreCompleto } = model
    return new Promise(async (resolve, reject) => {
      let instance = await CabActividadTeleModel.findOne({
        where: { actividadId }
      })
      let emailAutorizador = await VistaDatoEmpleadoModel.sequelize.query(`select E_MAIL from fcb_v_dato_empl where ROL_EMPL = '${rolAutorizador}'`, {
        type: QueryTypes.SELECT,
        plain: true
      })
      let emailSolicitante = await VistaDatoEmpleadoModel.sequelize.query(`select E_MAIL from fcb_v_dato_empl where ROL_EMPL = '${rolEmpleado}'`, {
        type: QueryTypes.SELECT,
        plain: true
      })
      const { E_MAIL: emailAutoriza } = emailAutorizador
      const { E_MAIL: emailSolicita } = emailSolicitante

      if (instance) {
        CabActividadTeleModel.update({ estadoActividad: 'DE' }, { where: { actividadId } }).then(() => {

          VistaDatoEmpleadoModel.sequelize.query(`BEGIN sendmail('${emailSolicita}','${emailAutoriza}','Postmaster@eeq.com.ec','Sistema de control de asistencias y registro de actividades','${nombreCompleto} revise sus actividades ya que han sido devueltas.'); END; `).then(() => {
            resolve({ success: true })
          })

        })
      } else {
        reject({ message: `no hay cabecera para enviar` })
      }
    })
  }

  function updateDetaDevolverActi (detalleId, model) {
    const { actividadId } = model
    return new Promise(async (resolve, reject) => {
      let instance = await DetaActividadTeleModel.findOne({
        where: { detalleId }
      })
      if (instance) {
        DetaActividadTeleModel.update({ aprobacionJefatura: 'AD' }, { where: { detalleId } }).then(
          async () => {
            const count = await DetaActividadTeleModel.count({ where: { actividadId, aprobacionJefatura: 'AD' } })
            console.log('numero', count)
            if (count > 0) {
              CabActividadTeleModel.update({ estadoActividad: 'DE' }, { where: { actividadId } })
                .then(() => {
                  resolve({ success: true })
                })
            } else {
              resolve({ success: true })
            }
          }).catch(reject)

      } else {
        reject({ message: `no hay cabecera para enviar` })
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
            console.log('numero', pentA)
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
        estadoActividad: ['AC', 'DE']
      }
    })
  }

  function findAllCabActiAutorizador (ROL_AUTO) {
    return CabActividadTeleModel.findAll({
      where: {
        ROL_AUTO,
        estadoActividad: ['SE']
      }
    })
  }

  function findAllDetActividades (actividadId) {
    return DetaActividadTeleModel.findAll({
      where: {
        actividadId,
        aprobacionJefatura: ['AC', 'AD', 'AA']
      }
    })
  }

  // function findAllActiDiariasBySemana (actividadId) {
  //   return CabActividadTeleModel.findAll({
  //     raw: true,
  //     where: {
  //       actividadId
  //     },
  //     attributes: [['FECH_INIC', 'Fecha Inicio'], ['FECH_FINA', 'Fecha Fin'], ['NOMB_COMP', 'Nombre Completo'], ['ESTA_ACTI', 'Estado']],
  //     include: [
  //       {
  //         raw: true,
  //         attributes: ['DESC_ACTI'],
  //         model: DetaActividadTeleModel,
  //         required: true
  //       }
  //     ]
  //   })
  // }

  function findAllActiDiariasBySemana (actividadId) {
    return CabActividadTeleModel.sequelize.query(`select c.fech_inic as semanaInicio,
  c.fech_fina as semanaFin,
  c.nomb_comp as nombreCompleto,
  c.esta_acti as estado,
  d.desc_acti as descripcion,
  d.prod_entr as producto,
  d.avan_porc as avance,
  d.obse_acti as observacion,
  d.refe_acti as referencia,
  d.dia_sema as fecha
  from rh_apc_t_acti_tele c
  join rh_apc_t_deta_acti_tele d
  on c.actividad_id = d.actividad_id
  where c.actividad_id = '${actividadId}'`, {
      type: QueryTypes.SELECT
    })
  }

  function findAllDetActividadesAutorizador (actividadId) {
    return DetaActividadTeleModel.findAll({
      where: {
        actividadId,
        aprobacionJefatura: ['AC', 'AA']
      }
    })
  }

  function deleteActividad (detalleId) {
    console.log('e', detalleId)
    return new Promise(async (resolve, reject) => {
      DetaActividadTeleModel.sequelize.query(`delete from RH_APC_T_ACTI_TELE where ACTIVIDAD_ID =  '${detalleId}'`, {
        type: QueryTypes.DELETE,
        plain: true,
        raw: true
      }).then(resolve).catch(reject)
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
    findAllActiDiariasBySemana,
    updateDetalle,
    updateDetaDevolverActi,
    updateDetalleAutorizador,
    updateCabEnviarSemana,
    updateCabDevolverActi,
    deleteActividad,
    deleteDetaActividad
  }

}