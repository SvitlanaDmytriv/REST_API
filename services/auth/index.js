const jwt = require('jsonwebtoken')
const UsersRepository = require('../../repository/user')
const SECRET_KEY = process.env.JWT_SECRET_KEY

class AuthService {
  async isUserExist(email) {
    const user = await UsersRepository.findByEmail(email)
    return !!user
  }

  async create(body) {
    const {
      id,
      name,
      email,
      subscription,
      avatarURL,
    } = await UsersRepository.create(body)
    return {
      id,
      name,
      email,
      subscription,
      avatarURL,
    }
  }

  async getUser(email, password) {
    const user = await UsersRepository.findByEmail(email)
    const isValidPassword = await user?.isValidPassword(password)
    if (!isValidPassword) {
      return null
    }
    return user
  }

  async updateUserSubscription(id, subscription) {
    const user = await UsersRepository.updateUserSubscription(id, subscription)
    return user
  }

  getToken(user) {
    const { id, email } = user
    const payload = { id, email }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '8d' })
    return token
  }

  async setToken(id, token) {
    await UsersRepository.updateToken(id, token)
  }
}

module.exports = AuthService
