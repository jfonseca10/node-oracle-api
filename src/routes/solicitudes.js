const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../db')

const api = asyncify(express.Router())
let services, Solicitudes

api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()

    } catch (e) {
      next(e)
    }
    Solicitudes = services.Solicitudes
  }
  next()
})

api.get('/solicitudesList', async (req, res, next) => {
  let result
  try {
    result = await Solicitudes.findAllSolicitudes()
    if (result && result.length > 0) {
      res.send(result)
    } else {
      res.status(204).send('no hay datos')
    }
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

api.get('/detalleBySolicitudes', async (req, res, next) => {
  const { solicitudBodegaNum, codigoBodega } = req.query
  let result
  try {
    result = await Solicitudes.findAllDetalleBySolicitudes(solicitudBodegaNum, codigoBodega)
    if (result && result.length > 0) {
      res.send(result)
    } else {
      res.status(204).send('no hay datos')
    }
  } catch (e) {
    return next(e)
  }
})

module.exports = api
