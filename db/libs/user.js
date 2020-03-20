module.exports = function setupUser (UserModel) {
  function findUserByUserName (username) {
    return UserModel.findOne({
        where: { username },
      }
    )
  }

  return {
    findUserByUserName
  }
}
