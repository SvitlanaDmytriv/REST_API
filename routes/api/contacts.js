const express = require('express')
const router = express.Router()

const {
  validateCreate,
  validateUpdate,
  validateUpdateFavorite,
} = require('../../middlewares/validationMiddleware')

const {
  getContactController,
  getContactByIdController,
  addContactController,
  updateContactByIdController,
  deleteContactByIdController,
} = require('../../controllers/contacts')

router.get('/', getContactController)

router.get('/:contactId', getContactByIdController)

router.post('/', validateCreate, addContactController)

router.delete('/:contactId', deleteContactByIdController)

router.put('/:contactId', validateUpdate, updateContactByIdController)

router.patch(
  '/:contactId/favorite',
  validateUpdateFavorite,
  updateContactByIdController,
)

module.exports = router
