const { api } = require('config')
const jwt = require('jsonwebtoken')

sign = (payload) => {
  return jwt.sign(payload, api.secret, { expiresIn: '1d' })
}

verify = (payload) => {
  return jwt.verify(payload, api.secret)
}

module.exports = { sign, verify }
