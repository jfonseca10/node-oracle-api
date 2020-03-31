const { v1 } = require('uuid')
const bcrypt = require('bcrypt')
const { api } = require('config')

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
    return new Promise(async (resolve, reject) => {
      const { email, username, password } = model
      let instanceModel = await UserModel.findOne({
        where: { $or: [{ email }, { username }] }
      })
      if (instanceModel) {
        reject({ message: 'el usuario ya existe' })
      } else {
        model.id = v1()
        model.password = await bcrypt.hash(password, api.bsr)
        UserModel.create(model).then(result => {
          const { id, name, username, email } = result
          resolve({ id, name, username, email })
        })
      }

    })

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
