const http = require('http')
const https = require('https')
const fs = require('fs')
const cors = require('cors')
const express = require('express')
const asyncnify = require('express-asyncify')
const minimist = require('minimist')
const params = minimist(process.argv)
const { api } = require('config')
let envProd = false
if (params.prod && params.prod === 'true') {
  envProd = true
}

const vistaDatoEmpleado = require('./src/routes/vistaDatoEmpleado')
const userRoute = require('./src/routes/user')
const authmiddleware = require('./middleware/auth')
const regionRoute = require('./src/routes/region')
const actividadesRoute = require('./src/routes/actividades')
const registroAsistenciaRoute = require('./src/routes/registroAsistencia')
const jefeRoute = require('./src/routes/jefe')

const app = asyncnify(express())
let server
if (envProd) {
  const privateKey = fs.readFileSync('/opt/openssl/nodejs.eeq.com.ec-key.pem', 'utf8')
  const certificate = fs.readFileSync('/opt/openssl/nodejs.eeq.com.ec-crt.pem', 'utf8')
  const ca = fs.readFileSync('/opt/openssl/nodejs.eeq.com.ec-crt.pem', 'utf8')
  const credentials = {
    key: privateKey,
    cert: certificate,
    ca
  }
  server = https.createServer(credentials, app)
} else {
  server = http.createServer(app)
}

app.use(cors())
app.use(express.json())

app.use('/user', userRoute)
app.use('/datoEmpleado', vistaDatoEmpleado)
app.use(authmiddleware)
app.use('/actividades', actividadesRoute)
app.use('/registroAsistencia', registroAsistenciaRoute)
app.use('/region', regionRoute)
app.use('/jefe', jefeRoute)

server.listen(api.port, () => {
  console.log(`aplicacion en ejecucion puerto ${api.port}`)
})
