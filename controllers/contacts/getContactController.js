const { listContacts } = require('../../services/contacts')
const { HttpCode } = require('../../lib/constants')

const getContactController = async (req, res) => {
  const { id: userId } = req.user

  const contacts = await listContacts(userId)

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
