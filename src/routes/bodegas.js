const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../db')

const api = asyncify(express.Router())
let services, Bodega

api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
    } catch (e) {
      next(e)
    }
    Bodega = services.Bodegas
  }
  next()
})

api.get('/listBodegas', async (req, res, next) => {
  try {
    let result
    result = await Bodega.findAllBodegas()
    res.send(result)
  } catch (e) {
    return next(e)
  }
})

module.exports = api
