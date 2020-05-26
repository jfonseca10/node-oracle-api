const express = require('express')
const asyncify = require('express-asyncify')
const { sign } = require('../../libs/auth')
const bcrypt = require('bcrypt')
const authMiddleware = require('../../middleware/auth')
const db = require('../../db')
const { v5 } = require('uuid')
const config = require('config')
const moment = require('moment')

const api = asyncify(express.Router())
let services, User, RegistroAsistencia, DatoEmpleado

api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
    } catch (e) {
      next(e)
    }
    User = services.User
    RegistroAsistencia = services.RegistroAsistencia
    DatoEmpleado = services.VistaDatoEmpleado
  }
  next()
})

api.post('/signin', async (req, res, next) => {
  const { rol, password } = req.body
  let result
  if (rol && password) {
    try {
      result = await User.findUserByUserName(rol)
      if (result) {
        if (await bcrypt.compare(password, result.password)) {
          const { id, name, email } = result
          const jsonToken = { id, name, email }
          // const date = moment().subtract(5, 'hours').toDate()
          const data = {
            id,
            name,
            rol,
            token: sign(jsonToken)
          }
          // const rolUsuario = {
          //   rol: '42277',
          //   fecha: date
          // }
          // registroAsistencia = await RegistroAsistencia.create(rolUsuario)
          res.send(data)
        } else {
          res.status(404).send('password incorrect')
        }
      } else {
        res.status(404).send('user not found')
      }

    } catch (e) {
      return next(e)
    }
  } else {
    res.status(401).send('username and password required')
  }

})

api.get('/getDatoEmpleado', async (req, res, next) => {
  const { rol } = req.query
  let result
  try {
    result = await DatoEmpleado.findAllVistaDatoEmpleado(rol)
    console.log('lo devuelto es :', result)
    if (result != null) {
      console.log('no es null')
      res.send(result)
    } else {
      console.log('es nulo')
      res.status(401).send('no hay datos')
    }
  } catch (e) {
    return next(e)
  }
})


api.post('/create', async (req, res, next) => {
  const newUser = req.body
  let result
  try {
    result = await User.create(newUser).catch(e => {
      res.status(406).send(e)
    })
    if (result) {
      res.send(result)
    }
  } catch (e) {
    return next(e)
  }
})
api.post('/verifyCode', async (req, res, next) => {
  let result
  const { code } = req.body
  try {
    result = await User.findUserByRPC(code)
    if (result) {
      res.send({ message: 'ok' })
    } else {
      res.status(404).send({ message: 'no encontrado' })
    }
  } catch (e) {
    return next(e)
  }
})
api.post('/verifyMail', async (req, res, next) => {
  const { email } = req.body
  let emailResult
  try {
    emailResult = await User.findUserEmail(email)
    if (emailResult) {
      const code = v5(`reset_${email}_${new Date()}`, v5.URL)
      await User.update(emailResult.id, { resetPasswordCode: code })
      const link = `este es el link de reseteo https://nodejs.eeq.com.ec/user/reset-password/${code}`
      User.sendMailResetPass(emailResult, link)
      res.send({ message: 'ok' })
    } else {
      res.status(404).send({ message: 'email no encontrado' })
    }

  } catch (e) {
    return next(e)
  }

})
api.post('/returnAction', async (req, res, next) => {
  const { code, npwd } = req.body
  try {
    const user = await User.findUserByRPC(code)
    if (user) {
      const password = await bcrypt.hash(npwd, config.api.bsr)
      const userModel = { resetPasswordCode: null, password }
      await User.update(user.id, userModel)
      res.send({ message: 'ok' })

    } else {
      res.status(404).send({ message: 'no found' })
    }
  } catch (e) {
    next(e)
  }
})

api.get('/manualExport', async (req, res, next) => {
  try {
    res.download(`./temp/Manual.pdf`)
  } catch (e) {
    return next(e)
  }
})

api.use(authMiddleware)
api.get('/listUser', async (req, res, next) => {
  try {
    let result
    result = await User.findAllUser()
    res.send(result)
  } catch (e) {
    return next(e)
  }
})
api.get('/list', (req, res, next) => {
  //let result
  try {
    User.findAllUser().then(data => {
      res.send(data)
    }).catch(e => {
      res.status(204).send(e)
    })
  } catch (e) {
    next(e)
  }
})

// api.put('/update/:id', (req, res) => {
//   const { id } = req.params
//   const newData = req.body
//   console.log(typeof id)
//
//   users.map((user, idx) => {
//     console.log(typeof user.id)
//     if (user.id === parseInt(id, 10)) {
//       users[idx] = { ...user, ...newData }
//     }
//   })
//   console.log(id, newData)
//   res.send(id)
// })
// api.delete('/delete', (req, res) => {
//   const { id } = req.query
//   console.log('es:', id)
//   users.map((user, idx) => {
//     if (user.id === parseInt(id, 10)) {
//       users.splice(idx, 1)
//     }
//   })
//   res.send(users)
// })

module.exports = api
