const fs = require('fs/promises')
const crypto = require('crypto')
const contacts = require('../../db/contacts.json')

const PATH = 'db/contacts.json'

const listContacts = async () => {
  return contacts
}

const getContactById = async (contactId) => {
  const [contact] = contacts.filter((contact) => contact.id === contactId)

  return contact
}

const removeContact = async (contactId) => {
  const contactWithoutRemoved = contacts.filter(
    (el) => el.id.toString() !== contactId,
  )
  await fs.writeFile(PATH, JSON.stringify(contactWithoutRemoved, null, 2))
  return await listContacts()
}

const addContact = async ({ name, email, phone }) => {
  const newContact = { name, email, phone, id: crypto.randomUUID() }
  contacts.push(newContact)
  await fs.writeFile(PATH, JSON.stringify(contacts))
  return newContact
}

const updateContact = async (contactId, { name, email, phone }) => {
  contacts.forEach((contact) => {
    if (contact.id === contactId) {
      if (name) {
        contact.name = name
      }
      if (email) {
        contact.email = email
      }
      if (phone) {
        contact.phone = phone
      }
    }
  })

  const updateContactById = await getContactById(contactId)

  return updateContactById
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
