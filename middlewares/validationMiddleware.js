const Joi = require('joi')

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(9).max(20).required(),
})

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
}).or('name', 'email', 'phone')

const validateCreate = async (req, res, next) => {
  try {
    const validationResult = await addSchema.validateAsync(req.body)
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Field ${err.message.replace(/"/g, '')}` })
  }
  next()
}

const validateUpdate = async (req, res, next) => {
  try {
    const validationResult = await updateSchema.validateAsync(req.body)
  } catch (err) {
    const [{ type }] = err.details
    if (type === 'object.unknown') {
      return res.status(400).json({ message: err.message })
    }
    return res.status(400).json({ message: `missing fields` })
  }
  next()
}

module.exports = { validateCreate, validateUpdate }
