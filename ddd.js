const Joi = require('joi')

module.exports = {
  contactValidationSchema: (req, _res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      phone: Joi.string().min(9).max(20).required(),
      email: Joi.string().email().required(),
    })

    const validationResult = schema.validate(req.body)

    if (validationResult.error) {
      next({ message: validationResult.error.details[0].message })
    }

    next()
  },

  updateContactValidation: (req, _res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).optional(),
      phone: Joi.string().min(9).max(20).optional(),
      email: Joi.string().email().optional(),
    })

    const validationResult = schema.validate(req.body)

    if (validationResult.error) {
      next({ message: validationResult.error.details[0].message })
    }

    next()
  },
}
