const { removeContact } = require('../../services/contacts/contacts')
const HttpCode = require('../../lib/constants')

const deleteContactByIdController = async (req, res) => {
  const contactId = req.params.contactId
  const delContact = await removeContact(contactId)

  if (!delContact) {
    return res
      .status(HttpCode.NOT_FOUND)
      .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
  }

  return res
    .status(HttpCode.OK)
    .json({ status: 'success', code: HttpCode.OK, message: 'contact deleted ' })
}

module.exports = deleteContactByIdController
