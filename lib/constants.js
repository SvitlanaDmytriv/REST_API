const HttpCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UE: 422,
  INTERNAL_SERVER_ERROR: 500,
}

const Roles = {
  STARTER: 'starter',
  PRO: 'pro',
  BUSINESS: 'business',
}
module.exports = { HttpCode, Roles }
