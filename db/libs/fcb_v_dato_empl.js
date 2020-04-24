const { QueryTypes } = require('sequelize-oracle')
module.exports = function setupVistaDatoEmpleado (VistaDatoEmpleadoModel) {

  function findAllVistaDatoEmpleado (rol) {
    return VistaDatoEmpleadoModel.sequelize.query(`select * from fcb_v_dato_empl where ROL_EMPL =  '${rol}'`, {
      type: QueryTypes.SELECT,
      plain: true
    })
  }



  function findAllDatosSolicitantes (rol) {
    const rolnew = []
    for (var i = 0; i < rol.length; i++) {
      // rolnew = rol[i].rolEmpleado
      rolnew.push(`'` + rol[i].rolEmpleado + `'`)
    }

    console.log('los valores', rolnew)

    return VistaDatoEmpleadoModel.sequelize.query(`select ROL_EMPL,NOMB_EMPL from fcb_v_dato_empl where ROL_EMPL in (${rolnew})`, {
      type: QueryTypes.SELECT
    })
  }

  return {
    findAllVistaDatoEmpleado,
    findAllDatosSolicitantes
  }
}