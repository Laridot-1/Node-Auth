import {
  createUser,
  getUser,
  updateField,
  verifyEmail,
  verifyReset,
} from "../models/auth.model.js"
import { StatusCodes } from "http-status-codes"
import {
  generateCode,
  sendEmail,
  setCookie,
  verifyToken,
} from "../utils/utils.js"
import { NotFoundError, UnauthenticatedError } from "../errors/errors.js"
import bcrypt from "bcryptjs"

const handleCreateUser = async (req, res) => {
  const { name, email, password } = req.body

  const verificationCode = generateCode()

  const verificationCodeExpiresAt = Date.now() + 1 * 60 * 60 * 1000

  const message = `
    <h1>${verificationCode}</h1>
    <p>Code will expire in 1 hour.</p>
    <p>Don't share this Code with anyone, else your account might be compromised.</p>
    `

  const user = await createUser({
    name,
    email,
    password,
    verificationCode,
    verificationCodeExpiresAt,
  })

  const token = user.createToken("7d")

  setCookie(res, token)

  await sendEmail(email, message, `Email verification requested at ${Date()}`)

  res.status(StatusCodes.CREATED).json({ msg: "Verification code sent" })
}

const handleVerifyEmail = async (req, res) => {
  const { verificationCode } = req.body
  const { token } = req.cookies

  const { userId: _id } = verifyToken(token)

  const verifiedUser = await verifyEmail(_id, verificationCode)

  if (!verifiedUser) {
    throw new UnauthenticatedError("Invalid or expired verification code")
  }

  const updatedUser = await updateField(
    { _id },
    {
      verified: true,
      verificationCode: null,
      verificationCodeExpiresAt: null,
    }
  )

  const message = `
    <h1>Welcome ${updatedUser.name}</h1>
    <p>We're happy to have you on board</p>
    `

  await sendEmail(updatedUser.email, message, `Welcome`)

  setCookie(res, token)

  res.status(StatusCodes.OK).json({
    name: updatedUser.name,
    lastSeen: updatedUser.lastSeen,
    verified: updatedUser.verified,
  })
}

const handleLogout = async (req, res) => {
  res.clearCookie("token")
  res.status(StatusCodes.OK).json({ msg: "Logged out" })
}

const handleLogin = async (req, res) => {
  const { email, password } = req.body

  const existingUser = await getUser(email)

  if (!existingUser) {
    throw new UnauthenticatedError("Invalid credentials")
  }

  const canLogin = await existingUser.verifyPassword(password)

  if (!canLogin) {
    throw new UnauthenticatedError("Invalid credentials")
  }

  const user = await updateField(
    { _id: existingUser._id },
    { lastSeen: Date.now() }
  )

  const token = existingUser.createToken("7d")

  setCookie(res, token)

  res
    .status(StatusCodes.OK)
    .json({ name: user.name, lastSeen: user.lastSeen, verified: user.verified })
}

const handleForgotPassword = async (req, res) => {
  const { email } = req.body

  const existingUser = await getUser(email)

  if (!existingUser) {
    throw new NotFoundError("User not found")
  }

  const resetPasswordToken = existingUser.createToken("1h")
  const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000

  await updateField({ email }, { resetPasswordToken, resetPasswordExpiresAt })

  const url = `${process.env.URL}/reset?token=${resetPasswordToken}`

  const message = `Click this link to reset your password ${url}`

  await sendEmail(email, message, `Reset password requested at ${Date()}`)

  res
    .status(StatusCodes.OK)
    .json({ msg: "Password reset link sent to your email" })
}

const handleResetVerifiedPassword = async (req, res) => {
  const { password, token: resetPasswordToken } = req.body

  const { userId: _id } = verifyToken(resetPasswordToken)

  const user = await verifyReset(_id, resetPasswordToken)

  if (!user) {
    throw new UnauthenticatedError("Invalid or expired token")
  }

  const salt = await bcrypt.genSalt(10)

  const hashedPassword = await bcrypt.hash(password, salt)

  const updatedUser = await updateField(
    { _id },
    {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpiresAt: null,
    }
  )

  await sendEmail(
    updatedUser.email,
    "Password reset successful",
    `Password updated at ${Date()}`
  )

  res.status(StatusCodes.OK).json({ msg: "Password reset successful" })
}

export {
  handleCreateUser,
  handleVerifyEmail,
  handleLogout,
  handleLogin,
  handleForgotPassword,
  handleResetVerifiedPassword,
}
