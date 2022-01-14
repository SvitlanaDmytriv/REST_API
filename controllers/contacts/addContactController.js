const { addContact } = require('../../services/contacts')
const { HttpCode } = require('../../lib/constants')

const addContactController = async (req, res) => {
  const { id: userId } = req.user
  const { name, email, phone } = req.body

  if (!name || !email || !phone) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'missing required  field',
    })
  }

  const newContact = await addContact(userId, req.body)

  if (!newContact) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'Contact not added',
    })
  }

  return res.status(HttpCode.CREATED).json({
    status: 'success',
    code: HttpCode.CREATED,
    data: { contact: newContact },
  })
}

module.exports = addContactController
