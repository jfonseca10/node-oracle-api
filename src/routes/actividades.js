const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../db')

const api = asyncify(express.Router())
let services, ActividadTele, EmpleadoJefatura, EmpleadoData
api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
    } catch (e) {
      return next(e)
    }
    ActividadTele = services.ActividadTele
    EmpleadoJefatura = services.EmpleadoJefatura
    EmpleadoData = services.VistaDatoEmpleado
  }
  next()
})

api.get('/actividadesList', async (req, res, next) => {
  const { rol } = req.query
  let result
  try {
    result = await ActividadTele.findAllCabActividades(rol)
    if (result && result.length > 0) {
      res.send(result)
    } else {
      res.status(204).send('no hay datos')
    }
  } catch (e) {
    return next(e)
  }
})

api.get('/actividadesListAutorizador', async (req, res, next) => {
  const { rol } = req.query
  let result
  try {
    result = await ActividadTele.findAllCabActiAutorizador(rol)

    if (result && result.length > 0) {
      res.send(result)
    } else {
      res.status(204).send('no hay datos')
    }
  } catch (e) {
    return next(e)
  }
})

api.get('/actividadesDetalleList', async (req, res, next) => {
  const { actividadId } = req.query
  let result
  try {
    result = await ActividadTele.findAllDetActividades(actividadId)
    console.log('resultjjj', result)
    if (result && result.length > 0) {
      res.send(result)
    } else {
      res.status(204).send('no hay datos')
    }
  } catch (e) {
    return next(e)
  }
})

api.get('/actiDetaListAutorizador', async (req, res, next) => {
  const { actividadId } = req.query
  let result
  try {
    result = await ActividadTele.findAllDetActividadesAutorizador(actividadId)
    console.log('resultjjj', result)
    if (result && result.length > 0) {
      res.send(result)
    } else {
      res.status(204).send('no hay datos')
    }
  } catch (e) {
    return next(e)
  }
})

api.post('/createActividad', async (req, res, next) => {
  const Actividad = req.body
  const { rol, name, fechaInicio, fechaFin } = Actividad
  let result
  let resultJefatura
  let centroCosto
  try {
    resultJefatura = await EmpleadoJefatura.findJefaturaByEmpleado(rol)
    const { rolJefatura } = resultJefatura
    centroCosto = await EmpleadoData.findCentroCostoByEmpleado(rol)
    const { CENT_COST } = centroCosto
    console.log('este es el costo', CENT_COST)
    const newActividad = {
      rol,
      name,
      fechaInicio,
      fechaFin,
      rolJefatura,
      CENT_COST
    }
    result = await ActividadTele.crearCabecera(newActividad).catch(e => {
      console.log('api error', e)
      res.status(406).send('el rango de fechas es maximo de 7 dias y no se puede ingresar un dia que ya exista en el rango')
    })
    if (result) {
      res.send(result)
    }
  } catch (e) {
    return next(e)
  }
})

api.post('/createDetalleActividad', async (req, res, next) => {
  const newActividad = req.body
  console.log('api', newActividad)
  let result
  try {
    result = await ActividadTele.crearDetalle(newActividad).catch(e => {
      res.status(406).send(result)
    })
    if (result) {
      res.send(result)
    }
  } catch (e) {
    return next(e)
  }
})

api.post('/updateDetalleActividad/:id', async (req, res, next) => {
  const model = req.body
  const { id } = req.params
  let result
  try {
    result = await ActividadTele.updateDetalle(id, model).catch(e => {
      res.status(406).send(e)
    })
    console.log('la respuesta es: ', result)
    if (result) {
      res.send(result)
    }
  } catch (e) {
    return next(e)
  }

})

api.post('/aprobacionAutorizador/:id', async (req, res, next) => {
  const model = req.body
  const { id } = req.params
  let result
  try {
    result = await ActividadTele.updateDetalleAutorizador(id, model)
    console.log('la respuesta es: ', result)
    if (result) {
      res.send(result)
    }
  } catch (e) {
    return next(e)
  }

})

api.post('/deleteActividad', async (req, res, next) => {
  const { actividadId } = req.body
  let result
  try {
    result = await ActividadTele.deleteActividad(actividadId)
    res.send({ message: 'ok' })

  } catch (e) {
    return next(e)
  }

})

api.post('/deleteDetalleActividad', async (req, res, next) => {
  const { detalleId } = req.body
  let result
  try {
    result = await ActividadTele.deleteDetaActividad(detalleId)
    res.send({ message: 'ok' })

  } catch (e) {
    return next(e)
  }

})

module.exports = api