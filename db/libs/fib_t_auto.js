module.exports = function setupAutorizadores (AutorizadoresModel) {
  function findAllAutorizadores () {
    return AutorizadoresModel.findAll({
      limit: 10
    })
  }

  return {
    findAllAutorizadores
  }
}