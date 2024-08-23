import { UnauthenticatedError } from "../errors/errors.js"
import { verifyToken } from "../utils/utils.js"

export const auth = (req, res, next) => {
  try {
    const { token } = req.cookies

    if (!token) {
      throw new UnauthenticatedError("Unauthorized")
    }

    const { userId } = verifyToken(token)

    req.userId = userId

    next()
  } catch (err) {
    throw new UnauthenticatedError(err.message)
  }
}
