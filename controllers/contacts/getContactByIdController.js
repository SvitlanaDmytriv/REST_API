const { getContactById } = require('../../services/contacts/contacts')
const HttpCode = require('../../lib/constants')

const getContactByIdController = async (req, res) => {
  const contactId = req.params.contactId
  const contactItem = await getContactById(contactId)

  if (!contactItem) {
    return res
      .status(HttpCode.NOT_FOUND)
      .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
  }

  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      contacts: contactItem,
    },
  })
}

module.exports = getContactByIdController
