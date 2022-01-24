const AuthService = require('../../services/auth')
const { HttpCode } = require('../../lib/constants')
const { FileStorage, LocalStorage } = require('../../services/file-storage')
const { SenderSendgrid, EmailService } = require('../../services/email')
const { findByEmail, updateVerify } = require('../../repository/user')

const authService = new AuthService()

const registration = async (req, res, next) => {
  try {
    const { email } = req.body
    const isUserExist = await authService.isUserExist(email)
    if (isUserExist) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: 'Email in use',
      })
    }
    const userData = await authService.create(req.body)
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new SenderSendgrid(),
    )
    const isSend = await emailService.sendVerifyEmail(
      email,
      userData.name,
      userData.verificationToken,
    )
    delete userData.verificationToken
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: { ...userData, isSendVerification: isSend },
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await authService.getUser(email, password)
    if (!user) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Email or password is wrong',
      })
    }
    const token = authService.getToken(user)
    await authService.setToken(user.id, token)

    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        token,
        user: { email: user.email, subscription: user.subscription },
      },
    })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  try {
    await authService.setToken(req.user.id, null)
    res.status(HttpCode.NO_CONTENT)
  } catch (error) {
    next(error)
  }
}

const getCurrent = (req, res, next) => {
  try {
    const { email, subscription } = req.user
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { email, subscription },
    })
  } catch (error) {
    next(error)
  }
}

const updateSubscription = async (req, res, next) => {
  try {
    const { id, subscription } = req.body
    const { name, email } = await authService.updateUserSubscription(
      id,
      subscription,
    )
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { id, name, email, subscription },
    })
  } catch (error) {
    next(error)
  }
}

const uploadAvatar = async (req, res, next) => {
  try {
    const uploadAvatar = new FileStorage(LocalStorage, req.file, req.user)
    const avatarUrl = await uploadAvatar.updateAvatar()
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { avatarUrl },
    })
  } catch (error) {
    next(error)
  }
}

const verifyUser = async (req, res, next) => {
  try {
    const token = req.params.verificationToken
    const isVerified = await authService.isUserVerified(token)
    if (isVerified) {
      await updateVerify(isVerified.id, true)
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { message: 'email verified successful' },
      })
    }
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.OK,
      data: { message: 'Invalid token' },
    })
  } catch (error) {
    next(error)
  }
}

const repeatEmailForVerifyUser = async (req, res, next) => {
  const { email } = req.body
  const user = await findByEmail(email)
  const { verify } = user
  if (!verify) {
    const { email, name, verificationToken } = user
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new SenderSendgrid(),
    )
    const isSend = await emailService.sendVerifyEmail(
      email,
      name,
      verificationToken,
    )
    if (isSend) {
      return res.status(HttpCode.OK).json({
        status: 'OK',
        code: HttpCode.OK,
        message: 'Verification email sent',
      })
    }
    return res.status(HttpCode.UE).json({
      status: 'error',
      code: HttpCode.UE,
      message: 'Unprocessable Entity',
    })
  }
  res.status(HttpCode.BAD_REQUEST).json({
    status: 'Bad Request',
    code: HttpCode.BAD_REQUEST,
    message: 'Verification has already been passed',
  })
}

module.exports = {
  registration,
  login,
  logout,
  getCurrent,
  updateSubscription,
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser,
}
