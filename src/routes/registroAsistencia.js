const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../db')

const api = asyncify(express.Router())
let services, RegistroAsistencia
api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
    } catch (e) {
      return next(e)
    }
    RegistroAsistencia = services.RegistroAsistencia
  }
  next()
})

api.post('/crearAsistencia', async (req, res, next) => {
  const dato = req.body
  let result
  try {
    result = await RegistroAsistencia.crearEntrada(dato).catch(e => {
      res.status(406).send(result)
    })
    if (result) {
      res.send(result)
    }
  } catch (e) {
    return next(e)
  }
})

api.post('/finAsistencia', async (req, res, next) => {
  const dato = req.body
  let result
  try {
    result = await RegistroAsistencia.crearSalida(dato).catch(e => {
      res.status(406).send(result)
    })
    if (result) {
      res.send(result)
    }
  } catch (e) {
    return next(e)
  }
})

api.post('/consultarAsistencia', async (req, res, next) => {
  const dato = req.body
  let result
  try {
    result = await RegistroAsistencia.consultarAsistencias(dato).catch(e => {
      res.status(406).send(result)
    })
    console.log(result);
    if (result) {

      res.send(result)
    }
  } catch (e) {
    return next(e)
  }
})
module.exports = api