const { QueryTypes } = require('sequelize-oracle')
module.exports = function setupEmpleadoJefatura (EmpleadoJefaturaModel) {

  function findJefaturaByEmpleado (ROL_EMP) {
    return EmpleadoJefaturaModel.findOne({
      where: { rolEmpleado: ROL_EMP }
    })
  }

  function findEmpleadosByJefatura (ROL_EMP) {
    return EmpleadoJefaturaModel.findAll({
      attributes: ['rolEmpleado'],
      where: { rolJefatura: ROL_EMP },
      order: [['ROL_EMP', 'DESC']]
    })
  }

  return {
    findJefaturaByEmpleado,
    findEmpleadosByJefatura
  }
}