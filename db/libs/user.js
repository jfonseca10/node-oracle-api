module.exports = function setupUser (UserModel) {
  function findUserByUserName (username) {
    return UserModel.findOne({
        where: { username },
      }
    )
  }

  function findAllUser () {
    return UserModel.findAll();
  }

  return {
    findUserByUserName,
    findAllUser
  }
}
