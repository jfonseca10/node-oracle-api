const { v1 } = require('uuid')
const bcrypt = require('bcrypt')
const { api } = require('config')
const nodemailer = require('nodemailer')
const { QueryTypes } = require('sequelize-oracle')
require('dotenv').config()

module.exports = function setupUser (UserModel, VistaDatoEmpleadoModel) {
  function findUserByUserName (rol) {
    return UserModel.findOne({
        where: { rol },
      }
    )
  }

  function findAllUser () {
    return UserModel.findAll()
  }

  function create (model) {
    return new Promise(async (resolve, reject) => {
      const { email, rol, password } = model
      let instanceModel = await UserModel.findOne({
        where: { $or: [{ email }, { rol }] }
      })
      if (instanceModel) {
        reject({ message: 'el usuario ya existe' })
      } else {
        model.id = v1()
        model.password = await bcrypt.hash(password, api.bsr)
        UserModel.create(model).then(result => {
          const { id, name, rol, email } = result
          resolve({ id, name, rol, email })
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
        UserModel.update(model, { where: { id } }).then(resolve).catch(reject)
      } else {
        reject({ message: `user:${id} not found` })
      }
    })
  }

  function deleted (id) {
    return UserModel.deleted(id)
  }

  function findUserEmail (email) {
    return UserModel.findOne({
      attributes: ['email', 'id'],
      where: { email }
    })
  }

  function findUserByRPC (resetPasswordCode) {
    return UserModel.findOne({
      attributes: ['email', 'id'],
      where: { resetPasswordCode }
    })
  }

  function sendMailResetPass (emailResult, link) {
    const { email } = emailResult
    return new Promise(async (resolve, reject) => {
      let e = VistaDatoEmpleadoModel.sequelize.query(`BEGIN sendmail('${email}','${email}','Postmaster@eeq.com.ec','Sistema de control de asistencias y registro de actividades','${link}'); END; `).then(() => {
        resolve({ success: true })
      })
    })


    // let transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.PASSWORD
    //   }
    // })

    // let mailOptions = {
    //   from: 'controlasistenciaseeq@gmail.com',
    //   to: email,
    //   subject: 'Reseteo clave Sistema Control de Asistencia',
    //   text: link
    // }

    // transporter.sendMail(mailOptions, function (err, data) {
    //   if (err) {
    //     console.log('Ocurrio un error')
    //   } else {
    //     console.log('Se envio el email')
    //   }
    //
    // })

  }

  return {
    findUserByUserName,
    findAllUser,
    create,
    update,
    deleted,
    sendMailResetPass,
    findUserEmail,
    findUserByRPC
  }
}
