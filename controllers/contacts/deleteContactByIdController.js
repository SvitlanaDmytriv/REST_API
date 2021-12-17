const { removeContact } = require('../../model/contacts/contacts')

const deleteContactByIdController = async (req, res) => {
  const contactId = req.params.contactId
  const delContact = await removeContact(contactId)

  if (!delContact) {
    return res.status(404).json({ message: 'Not found' })
  }

  return res.status(200).json({ message: 'contact deleted ' })
}

module.exports = deleteContactByIdController
