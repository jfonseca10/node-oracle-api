const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../db')

const api = asyncify(express.Router())
let services, Autorizadores, Solicitantes

api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
    } catch (e) {
      return next(e)
    }
    Autorizadores = services.EmpleadoJefatura
    Solicitantes = services.VistaDatoEmpleado
  }
  next()
})

api.get('/listAutorizadores', async (req, res, next) => {
  const { rol } = req.query
  console.log('api', rol)
  try {
    let result
    let datosSolicitantes
    result = await Autorizadores.findEmpleadosByJefatura(rol)
    datosSolicitantes = await Solicitantes.findAllDatosSolicitantes(result)
    if (datosSolicitantes && datosSolicitantes.length > 0) {
      res.send(datosSolicitantes)
    } else {
      res.status(204).send('no hay datos')
    }
  } catch (e) {
    next(e)
  }
})

module.exports = api
