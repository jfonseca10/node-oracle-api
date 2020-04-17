const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../db')

const api = asyncify(express.Router())
let services, DatoEmpleado
api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
    } catch (e) {
      return next(e)
    }
    DatoEmpleado = services.VistaDatoEmpleado
  }
  next()
})

api.get('/getDatoEmpleado', async (req, res, next) => {
  console.log('ok')
  let result
  try {
    result = await DatoEmpleado.findAllEmpleado()
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
