const { addContact } = require('../../model/contacts/contacts')

const addContactController = async (req, res) => {
  const { name, email, phone } = req.body

  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'missing required  field' })
  }
  const newContact = await addContact(req.body)

  if (!newContact) {
    return res.status(400).json({ message: 'Contact not added' })
  }

  return res.status(201).json(newContact)
}

module.exports = addContactController
