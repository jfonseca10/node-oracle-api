const express = require('express')
const asyncify = require('express-asyncify')
const db = require('../../db')
const jsonToXml = require('json2xls')
const fs = require('fs')
const moment = require('moment')

const api = asyncify(express.Router())
let services, EmpleadoJefatura, EmpleadoDatos, ActividadTele
api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
    } catch (e) {
      return next(e)
    }
    EmpleadoJefatura = services.EmpleadoJefatura
    EmpleadoDatos = services.VistaDatoEmpleado
    ActividadTele = services.ActividadTele
  }
  next()
})

api.get('/listaEmpleadosByJefe', async (req, res, next) => {
  const { rol } = req.query
  let resultEmpleados
  let datosEmpleados
  try {
    resultEmpleados = await EmpleadoJefatura.findEmpleadosByJefatura(rol)
    datosEmpleados = await EmpleadoDatos.findAllDatosSolicitantes(resultEmpleados)
    if (datosEmpleados && datosEmpleados.length > 0) {
      res.send(datosEmpleados)
    } else {
      res.status(204).send('no hay datos')
    }
  } catch (e) {
    return next(e)
  }
})

api.post('/listaActividadesByEmpleado', async (req, res, next) => {
  const objeto = req.body
  let result
  try {
    result = await ActividadTele.findAllActiByEmpleadoByFecha(objeto)
    console.log('jose', result)
    if (result && result.length > 0) {
      res.send(result)
      // const xlxsFile = jsonToXml(result)
      // const filename = `report${moment().format('YYYYMMDDHHmmss')}.xlsx`
      // const pathFile = fs.writeFileSync(`./temp/${filename}`, xlxsFile, 'binary')
      // console.log('devuelve', pathFile)
      // res.download(`./temp/${filename}`)
    } else {
      res.status(204).send('no hay datos')
    }
  } catch (e) {
    return next(e)
  }
})

module.exports = api