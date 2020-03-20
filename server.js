const http = require('http')
const express = require('express')

const authmiddleware = require('./middleware/auth')
const userRoute = require('./src/routes/user')

const app = express()
const server = http.createServer(app)

app.use(express.json())

app.use('/user', userRoute)
app.use(authmiddleware)
server.listen('8080', () => {
  console.log(`aplicacion en ejecucion puerto 8080`)
})
