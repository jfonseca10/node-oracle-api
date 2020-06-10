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
      model.fechaInicio = moment(fechaInicio).toDate()
      model.fechaFin = moment(fechaFin).toDate()
      model.fechaCrea = moment().subtract(5, 'hours').toDate()
      model.estadoActividad = 'CREADA'
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
        productoDigitalEntregable, fechaInicio, avancePorcentaje, referenciaActividad, etapaActividad
      } = model

      const numero = await DetaActividadTeleModel.count({
        where: {
          actividadId,
          diaSemana: { $between: [moment(`${fechaInicio} 00:00`).subtract(5, 'hours').toDate(), moment(`${fechaInicio} 23:59`).subtract(5, 'hours').toDate()] }
        }
      })
      if (numero < 5) {
        model.detalleId = v1()
        model.actividadId = actividadId
        model.diaSemana = moment(fechaInicio).subtract(5, 'hours').toDate()
        model.descripcionActividad = descripcionActividad
        model.productoDigitalEntregable = productoDigitalEntregable
        model.avancePorcentaje = ''
        model.observacionActividad = observacionActividad
        model.referenciaActividad = referenciaActividad
        model.aprobacionJefatura = 'CREADA'
        model.fechaAprobacion = ''
        model.etapaActividad = etapaActividad
        DetaActividadTeleModel.create(model).then(result => {
          const { actividadId, descripcion, observacion, productoEntregable, fechaInicio, porcentajeAvance, etapaActividad } = result
          resolve({
            actividadId,
            descripcion,
            observacion,
            productoEntregable,
            fechaInicio,
            porcentajeAvance,
            etapaActividad
          })
        })
      } else {
        reject({ message: 'No puede ingresar mas de 5 actividades diarias' })
      }

    })
  }

  function updateDetalle (detalleId, model) {
    const { fechaInicio } = model
    model.diaSemana = moment(fechaInicio).subtract(5, 'hours').toDate()
    model.aprobacionJefatura = 'ACTUALIZADA'
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
    const { rolAutorizador, rolEmpleado, nombreCompleto, fechaInicio, fechaFin } = model
    let fechaInicioSemana = moment(fechaInicio).calendar(null, { sameElse: 'YYYY-MM-DD' })
    let fechaFinSemana = moment(fechaFin).calendar(null, { sameElse: 'YYYY-MM-DD' })
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
        CabActividadTeleModel.update({ estadoActividad: 'ENVIADA' }, { where: { actividadId } }).then(() => {
          VistaDatoEmpleadoModel.sequelize.query(`BEGIN sendmail('${emailAutoriza}','${emailSolicita}','Postmaster@eeq.com.ec','Sistema de control de asistencias y registro de actividades','${nombreCompleto} le ha enviado la actividad semanal del ${fechaInicioSemana} al ${fechaFinSemana} para su aprobacion.'); END; `).then(() => {
            resolve({ success: true })
          })

        })

      } else {
        reject({ message: `no hay cabecera para enviar` })
      }

    })

  }

  function updateCabDevolverActi (actividadId, model) {
    const { rolAutorizador, rolEmpleado, nombreCompleto, fechaInicio, fechaFin } = model
    let fechaInicioSemana = moment(fechaInicio).calendar(null, { sameElse: 'YYYY-MM-DD' })
    let fechaFinSemana = moment(fechaFin).calendar(null, { sameElse: 'YYYY-MM-DD' })
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
        CabActividadTeleModel.update({ estadoActividad: 'DEVUELTA' }, { where: { actividadId } }).then(() => {

          VistaDatoEmpleadoModel.sequelize.query(`BEGIN sendmail('${emailSolicita}','${emailAutoriza}','Postmaster@eeq.com.ec','Sistema de control de asistencias y registro de actividades','${nombreCompleto} su actividad semanal del ${fechaInicioSemana} al ${fechaFinSemana} ya que han sido devueltas.'); END; `).then(() => {
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
        DetaActividadTeleModel.update({ aprobacionJefatura: 'DEVUELTA' }, { where: { detalleId } }).then(
          async () => {
            const count = await DetaActividadTeleModel.count({ where: { actividadId, aprobacionJefatura: 'DEVUELTA' } })
            console.log('numero', count)
            if (count > 0) {
              CabActividadTeleModel.update({ estadoActividad: 'DEVUELTA' }, { where: { actividadId } })
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
            const pentA = await DetaActividadTeleModel.count({ where: { actividadId, fechaAprobacion: null } })
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
        estadoActividad: ['CREADA', 'DEVUELTA']
      }
    })
  }

  function findAllCabActiAutorizador (ROL_AUTO) {
    return CabActividadTeleModel.findAll({
      where: {
        ROL_AUTO,
        estadoActividad: ['ENVIADA']
      }
    })
  }

  function findAllDetActividades (actividadId) {
    return DetaActividadTeleModel.findAll({
      where: {
        actividadId,
        aprobacionJefatura: ['CREADA', 'DEVUELTA', 'ACTUALIZADA']
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
  d.etap_acti as etapa,
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

  function findAllActiByEmpleadoByFecha (model) {
    const { ROL_EMPL, estadoActividad, fechaInicio, fechaFin } = model
    let estado
    if (estadoActividad === 'RECIBIDA') {
      estado = 'ENVIADO'
    } else {
      estado = 'AP'
    }
    return CabActividadTeleModel.findAll({
      attributes: [['FECH_INIC', 'fechaInicioPeriodo'], ['FECH_FINA', 'fechaFinPeriodo'],
        ['NOMB_COMP', 'Nombre']],
      include: [{
        model: DetaActividadTeleModel,
        attributes: [['DESC_ACTI','descripcion']],
        required: true
      }],
      where: {
        rolEmpleado: ROL_EMPL,
        estadoActividad: estado,
        fechaInicio: { $gte: moment(fechaInicio).toDate() },
        fechaFin: { $lte: moment(fechaFin).toDate() }
      },
      raw: true
    })
  }

  function findAllDetActividadesAutorizador (actividadId) {
    return DetaActividadTeleModel.findAll({
      where: {
        actividadId,
        aprobacionJefatura: ['CREADA', 'ACTUALIZADA']
      }
    })
  }

  function deleteActividad (detalleId) {
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
    findAllActiByEmpleadoByFecha,
    updateDetalle,
    updateDetaDevolverActi,
    updateDetalleAutorizador,
    updateCabEnviarSemana,
    updateCabDevolverActi,
    deleteActividad,
    deleteDetaActividad
  }

}