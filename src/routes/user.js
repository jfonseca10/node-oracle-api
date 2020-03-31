const express = require('express')
const asyncify = require('express-asyncify')
const { sign } = require('../../libs/auth')
const bcrypt = require('bcrypt')
const authMiddleware = require('../../middleware/auth')
const db = require('../../db')

const api = asyncify(express.Router())
let services, User

api.use('*', async (req, res, next) => {
  if (!services) {
    try {
      services = await db()
    } catch (e) {
      next(e)
    }
    User = services.User
  }
  next()
})

api.post('/signin', async (req, res, next) => {
  const { username, password } = req.body
  let result
  if (username && password) {
    try {
      result = await User.findUserByUserName(username)
      if (result) {
        if (await bcrypt.compare(password, result.password)) {
          const { id, name, email } = result
          const jsonToken = { id, name, email }
          console.log(result)
          const data = {
            id,
            name,
            username,
            token: sign(jsonToken)
          }
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
//api.use(authMiddleware)
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
