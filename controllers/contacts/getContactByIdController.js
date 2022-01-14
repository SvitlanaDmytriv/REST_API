const { getContactById } = require('../../services/contacts')
const { HttpCode } = require('../../lib/constants')

const getContactByIdController = async (req, res) => {
  const { id: userId } = req.user
  const contactId = req.params.contactId
  const contactItem = await getContactById(userId, contactId)

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
