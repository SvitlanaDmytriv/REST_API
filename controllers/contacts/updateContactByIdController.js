const { updateContact } = require('../../services/contacts/contacts')
const HttpCode = require('../../lib/constants')

const updateContactByIdController = async (req, res) => {
  const contactId = req.params.contactId

  if (!req.body) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'missing fields',
    })
  }

  const updateContactById = await updateContact(contactId, req.body)

  if (!updateContactById) {
    return res
      .status(HttpCode.NOT_FOUND)
      .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
  }

  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      contacts: updateContactById,
    },
  })
}

module.exports = updateContactByIdController
