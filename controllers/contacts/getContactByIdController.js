const { getContactById } = require('../../model/contacts/contacts')

const getContactByIdController = async (req, res) => {
  const contactId = req.params.contactId
  const contactItem = await getContactById(contactId)

  if (!contactItem) {
    return res.status(404).json({ message: 'Not found' })
  }

  return res.status(200).json(contactItem)
}

module.exports = getContactByIdController
