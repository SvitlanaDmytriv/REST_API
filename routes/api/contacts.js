const express = require('express')
const router = express.Router()
require('dotenv').config()

const {
  getContactController,
  getContactByIdController,
  addContactController,
  updateContactByIdController,
  deleteContactByIdController,
} = require('../../controllers/contacts')

router.get('/', async (req, res, next) => {
  getContactController()
})

router.get('/:contactId', async (req, res, next) => {
  getContactByIdController(req, res)
})

router.post('/', async (req, res, next) => {
  addContactController(req, res)
})

router.delete('/:contactId', async (req, res, next) => {
  deleteContactByIdController(req, res)
})

router.patch('/:contactId', async (req, res, next) => {
  updateContactByIdController(req, res)
})

module.exports = router
