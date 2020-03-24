module.exports = function setupBodegas(setupBodegasModel) {
  function findAllBodegas () {
    return setupBodegasModel.findAll()

  }

  return{
    findAllBodegas
  }

}
