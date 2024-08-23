import { StatusCodes } from "http-status-codes"
import { getProfile } from "../models/auth.model.js"
import { NotFoundError } from "../errors/errors.js"

export const handleGetProfile = async (req, res) => {
  const user = await getProfile(req.userId)

  if (!user) {
    throw new NotFoundError("User not found")
  }

  res.status(StatusCodes.OK).json({ user })
}
