module.exports = function setupCentroCostos (CentroCostosModel) {
  function findAllCentroCostos () {
    return CentroCostosModel.findAll()
  }

  function countAllCentroCostos () {
    return CentroCostosModel.findAndCountAll()
  }

  return {
    findAllCentroCostos,
    countAllCentroCostos
  }

}
