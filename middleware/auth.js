const { verify } = require('../libs/auth')

module.exports = function (req, res, next) {
  const token = req.headers['x-access-token'] || req.headers['authorization']
  if (token) {
    try {
      req.user = verify(token.split(' ')[1])
      next()
    } catch (e) {
      res.status(401).send('invalid token')
    }
  } else {
    res.status(401).send('Access denied. No token provided.')
  }
}
