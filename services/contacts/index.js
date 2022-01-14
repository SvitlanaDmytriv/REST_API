const { Contact } = require('../../model/contacts')

const listContacts = async (userId) => {
  const result = Contact.find({ owner: userId }).populate({
    path: 'owner',
    select: 'name email subscription',
  })
  return result
}

const getContactById = async (userId, contactId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: 'owner',
    select: 'name email subscription',
  })
  return result
}

const removeContact = async (userId, contactId) => {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  })
  return result
}

const addContact = async (userId, body) => {
  const result = await Contact.create({ ...body, owner: userId })
  return result
}

const updateContact = async (userId, contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true },
  )
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
