const nodemailer = require('nodemailer')
require('dotenv').config()

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

let mailOptions = {
  from: 'jose.emilio.fonseca.paz101010@gmail.com',
  to: 'jffonseca@eeq.com.ec',
  subject: 'prueba',
  text: 'holaquehace'
}

transporter.sendMail(mailOptions, function (err, data) {
  if (err) {
    console.log('Ocurrio un error')
  } else {
    console.log('Se envio el email')
  }

})

