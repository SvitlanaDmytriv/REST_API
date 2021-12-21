const { updateContact } = require('../../model/contacts/contacts')

const updateContactByIdController = async (req, res) => {
  const contactId = req.params.contactId

  if (!req.body) {
    return res.status(400).json({ message: 'missing fields' })
  }

  const updateContactById = await updateContact(contactId, req.body)

  if (!updateContactById) {
    return res.status(404).json({ message: 'Not found' })
  }

  return res.status(200).json(updateContactById)
}

module.exports = updateContactByIdController
