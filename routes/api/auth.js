const { Router } = require('express')
const {
  validateCreate,
  validateCredentials,
  validateUpdateSubscription,
  validateToken,
} = require('../../middlewares/validationUserMiddleware')
const { Roles } = require('../../lib/constants')
const {
  registration,
  login,
  logout,
  getCurrent,
  updateSubscription,
} = require('../../controllers/auth/index')
const guard = require('../../middlewares/guard')
const roleAccess = require('../../middlewares/roleAccess')

const router = new Router()

router.post('/signin', validateCreate, registration)
router.patch(
  '/',
  [guard, roleAccess(Roles.PRO), validateUpdateSubscription],
  updateSubscription,
)

router.post('/login', validateCredentials, login)
router.get('/logout', guard, logout)
router.get('/current', validateToken, guard, getCurrent)

module.exports = router
