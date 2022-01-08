const express = require('express')
const router = express.Router()
const guard = require('../../middlewares/guard')

const {
  validateCreate,
  validateUpdate,
  validateUpdateFavorite,
} = require('../../middlewares/validationContactsMiddleware')

const {
  getContactController,
  getContactByIdController,
  addContactController,
  updateContactByIdController,
  deleteContactByIdController,
} = require('../../controllers/contacts')

router.get('/', guard, getContactController)

router.get('/:contactId', guard, getContactByIdController)

router.post('/', [guard, validateCreate], addContactController)

router.delete('/:contactId', guard, deleteContactByIdController)

router.put('/:contactId', [guard, validateUpdate], updateContactByIdController)

router.patch(
  '/:contactId/favorite',
  [guard, validateUpdateFavorite],
  updateContactByIdController,
)

module.exports = router
