const sgMail = require('@sendgrid/mail')

class SenderSendgrid {
  async send(msg) {
    sgMail.setApiKey(process.env.API_KEY_SENDGID)
    return await sgMail.send({ ...msg, from: process.env.SENDER_SENDGID })
  }
}

module.exports = SenderSendgrid
