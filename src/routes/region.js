const express = require('express')
const asyncify = require('express-asyncify')

const db = require('../../db')

const api = asyncify(express.Router())
let services, Region
api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
    } catch (e) {
      return next(e)
    }
    Region = services.Region
  }
  next()
})

api.get('/regionList', async (req, res, next) => {
  let result
  try {
    result = await Region.regionList()
    if (result && result.length > 0) {
      res.send(result)
    } else {
      res.status(204).send('no hay datos')
    }
  } catch (e) {
    return next(e)
  }
})

api.get('/countriesByRegion', async (req, res, next) => {
  const { regionID } = req.query
  let result
  try {
    result = await Region.countryListByRegion(regionID)
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