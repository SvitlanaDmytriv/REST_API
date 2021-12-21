const { listContacts } = require('../../model/contacts/contacts')

const getContactController = async (_req, res) => {
  const contacts = await listContacts()

  if (!contacts) {
    return res.status(404).json({ message: 'Not found' })
  }

  return res.status(200).json(contacts)
}

module.exports = getContactController
