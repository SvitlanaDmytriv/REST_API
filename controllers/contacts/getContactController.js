const { listContacts } = require('../../services/contacts/contacts')
const HttpCode = require('../../lib/constants')

const getContactController = async (_req, res) => {
  const contacts = await listContacts()

  if (!contacts) {
    return res
      .status(HttpCode.NOT_FOUND)
      .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
  }

  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { contacts },
  })
}

module.exports = getContactController
