module.exports = function setupUser (UserModel) {
  function findUserByUserName (username) {
    return UserModel.findOne({
        where: { username },
      }
    )
  }

  function findAllUser () {
    return UserModel.findAll()
  }

  function create (model) {
    return UserModel.create(model)
  }

  function update (id, model) {
    //promesa para retornar codigo asincrono , consiste en 2 funciones : response, reject
    return new Promise(async (resolve, reject) => {
      let instance = await UserModel.findOne({
        where: { id }
      })
      if (instance) {
        UserModel.update({ where: { id } }, model).then(resolve).catch(reject)
      } else {
        reject({ message: `user:${id} not found` })
      }
    })
  }

  function deleted (id) {
    return UserModel.deleted(id)
  }

  return {
    findUserByUserName,
    findAllUser,
    create,
    update,
    deleted
  }
}
