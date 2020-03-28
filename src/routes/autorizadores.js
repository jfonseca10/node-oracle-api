const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../db')

const api = asyncify(express.Router())
let services, Autorizadores

api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
    } catch (e) {
      next(e)
    }
    Autorizadores = services.Autorizadores
  }
  next()
})

api.get('/listAutorizadores', async (req, res, next) => {
  try {
    let result
    result = await Autorizadores.findAllAutorizadores()
    res.send(result)
  } catch (e) {
    next(e)
  }
})

module.exports = api
