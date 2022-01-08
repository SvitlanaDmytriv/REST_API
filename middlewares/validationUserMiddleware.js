const Joi = require('joi')
const { Roles } = require('../lib/constants')

const createSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  password: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid(Roles.STARTER, Roles.PRO, Roles.BUSINESS),
  token: Joi.string().token(),
})

const credentialsSchema = Joi.object({
  email: Joi.string().min(2).max(30),
  password: Joi.string().min(2).max(30).required(),
})

const updateSubscriptionSchema = Joi.object({
  id: Joi.string().required(),
  subscription: Joi.string()
    .valid(Roles.STARTER, Roles.PRO, Roles.BUSINESS)
    .required(),
})

const updateCredentials = Joi.object({
  token: Joi.string().token(),
})

const validateCreate = async (req, res, next) => {
  try {
    await createSchema.validateAsync(req.body)
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Field ${err.message.replace(/"/g, '')}` })
  }
  next()
}
const validateCredentials = async (req, res, next) => {
  try {
    await credentialsSchema.validateAsync(req.body)
  } catch (err) {
    const [{ type }] = err.details
    if (type === 'object.missing') {
      return res.status(400).json({ message: 'missing field subscription' })
    }
    return res.status(400).json({ message: err.message })
  }
  next()
}

const validateUpdateSubscription = async (req, res, next) => {
  try {
    await updateSubscriptionSchema.validateAsync(req.body)
  } catch (err) {
    const [{ type }] = err.details
    if (type === 'object.missing') {
      return res.status(400).json({ message: 'missing field subscription' })
    }
    return res.status(400).json({ message: err.message })
  }
  next()
}
const validateToken = async (req, res, next) => {
  try {
    await updateCredentials.validateAsync(req.body)
  } catch (err) {
    const [{ type }] = err.details
    if (type === 'object.missing') {
      return res.status(400).json({ message: 'missing field token' })
    }
    return res.status(400).json({ message: err.message })
  }
  next()
}

module.exports = {
  validateCreate,
  validateCredentials,
  validateUpdateSubscription,
  validateToken,
}
