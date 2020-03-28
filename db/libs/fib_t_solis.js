module.exports = function setup (SolicitudesModel, DetalleSolicitudesModel) {

  function findAllSolicitudes () {
    return SolicitudesModel.findAll()
  }

  function findAllDetalleBySolicitudes (solicitudBodega, codigoBodega) {

    return DetalleSolicitudesModel.findAll({
      where: { solicitudBodega, codigoBodega }
    })

  }

  return {
    findAllSolicitudes,
    findAllDetalleBySolicitudes
  }

}