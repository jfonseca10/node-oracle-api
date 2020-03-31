const http = require('http')
const cors = require('cors')
const express = require('express')
const asyncnify = require('express-asyncify')

const authmiddleware = require('./middleware/auth')
const userRoute = require('./src/routes/user')
const centroCostosRoute = require('./src/routes/centroCostos')
const bodegasRoute = require('./src/routes/bodegas')
const autorizadoresRoute = require('./src/routes/autorizadores')
const solicitudesRoute = require('./src/routes/solicitudes')

const app = asyncnify(express())
const server = http.createServer(app)

app.use(cors())
app.use(express.json())

app.use('/user', userRoute)
app.use('/centroCostos', centroCostosRoute)
app.use('/bodegas', bodegasRoute)
app.use('/autorizadores', autorizadoresRoute)
app.use('/solicitudes', solicitudesRoute)
app.use(authmiddleware)
server.listen('8081', () => {
  console.log(`aplicacion en ejecucion puerto 8081`)
})
