const { QueryTypes } = require('sequelize-oracle')
module.exports = function setupEmpleadoJefatura (EmpleadoJefaturaModel) {

  function findJefaturaByEmpleado (ROL_EMP) {
    return EmpleadoJefaturaModel.findOne({
      where: { rolEmpleado: ROL_EMP }
    })
  }

  return {
    findJefaturaByEmpleado
  }
}