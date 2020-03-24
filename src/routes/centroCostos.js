const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../db')

const api = asyncify(express.Router())
let services, CentroCostos

api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()

    } catch (e) {
      next(e)
    }
    CentroCostos = services.CentroCostos
  }
  next()
})

api.get('/listCentroCostos', async (req, res, next) => {
  try {
    let result
    result = await CentroCostos.findAllCentroCostos()
    res.send(result)
  } catch (e) {
    next(e)
  }
})

api.get('/countCentroCostos', async (req, res, next) => {
  try {
    let result
    result = await CentroCostos.countAllCentroCostos()
    res.send(result)
  } catch (e) {
    next(e)
  }
})

module.exports = api
