import { StatusCodes } from "http-status-codes"

class BadRequestError extends Error {
  constructor(message) {
    super()
    this.status = StatusCodes.BAD_REQUEST
    this.message = message
  }
}

class UnauthenticatedError extends Error {
  constructor(message) {
    super()
    this.status = StatusCodes.UNAUTHORIZED
    this.message = message
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super()
    this.status = StatusCodes.NOT_FOUND
    this.message = message
  }
}

export { BadRequestError, UnauthenticatedError, NotFoundError }
