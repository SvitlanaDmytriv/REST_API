const fs = require('fs/promises')
const crypto = require('crypto')

const PATH = '../../db/contacts.json'

const listContacts = async () => {
  const content = await fs.readFile(PATH, 'utf8')
  const result = JSON.parse(content)
  return result
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const [contact] = contacts.filter((contact) => contact.id === contactId)
  return contact
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const contactWithoutRemoved = contacts.filter(
    (el) => el.id.toString() !== contactId,
  )
  await fs.writeFile(PATH, JSON.stringify(contactWithoutRemoved))
  return await listContacts()
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts()
  const newContact = { name, email, phone, id: crypto.randomUUID() }
  contacts.push(newContact)
  await fs.writeFile(PATH, JSON.stringify(contacts, null, 2))
  return newContact
}

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts()

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
