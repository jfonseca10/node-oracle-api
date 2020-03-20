const { api } = require('config')
const jwt = require('jsonwebtoken')

sign = (payload) => {
  return jwt.sign(payload, api.secret)
}

verify = (payload) => {
  return jwt.verify(payload, api.secret)
}

module.exports = { sign, verify }
