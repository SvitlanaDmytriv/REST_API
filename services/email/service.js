const Mailgen = require('mailgen')

class EmailService {
  constructor(env, sender) {
    this.sender = sender
    switch (env) {
      case 'development':
        this.link = 'http://localhost:3000'
        break
      case 'test':
        this.link = 'http://localhost:5000'
        break
      case 'production':
        this.link = 'http://heroku'
        break
      default:
        this.link = 'http://localhost:3000'
    }
  }

  createEmailTemplate(username, verifyToken) {
    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'GoIT',
        link: this.link,
      },
    })
    const email = {
      body: {
        name: username,
        intro: 'Welcome!',
        action: {
          instructions: 'To get started API, please click here:',
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    }
    return mailGenerator.generate(email)
  }

  async sendVerifyEmail(email, username, verifyToken) {
    const emailBody = this.createEmailTemplate(username, verifyToken)
    const msg = {
      to: email,
      subject: 'Verify email',
      html: emailBody,
    }
    try {
      const result = await this.sender.send(msg)
      return true
    } catch (error) {
      console.error(error.message)
      return false
    }
  }
}

module.exports = EmailService
