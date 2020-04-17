const { QueryTypes } = require('sequelize-oracle')
module.exports = function setupVistaDatoEmpleado (VistaDatoEmpleadoModel) {

  function findAllVistaDatoEmpleado (rol) {
    return VistaDatoEmpleadoModel.sequelize.query(`select * from fcb_v_dato_empl where ROL_EMPL =  '${rol}'`, {
      type: QueryTypes.SELECT,
      plain: true
    })
  }

  return {
    findAllVistaDatoEmpleado
  }
}