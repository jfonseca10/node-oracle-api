const http = require('http')
const express = require('express')
const asyncnify = require('express-asyncify')

const authmiddleware = require('./middleware/auth')
const userRoute = require('./src/routes/user')
const centroCostosRoute = require('./src/routes/centroCostos')
const bodegasRoute = require('./src/routes/bodegas')

const app = asyncnify(express())
const server = http.createServer(app)

app.use(express.json())

app.use('/user', userRoute)
app.use('/centroCostos', centroCostosRoute)
app.use('/bodegas', bodegasRoute)
app.use(authmiddleware)
server.listen('8080', () => {
  console.log(`aplicacion en ejecucion puerto 8080`)
})
