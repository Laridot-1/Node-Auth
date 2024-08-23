import { StatusCodes } from "http-status-codes"

const custom404 = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({
    msg: `Route: ${req.protocol}://${req.hostname}:${process.env.PORT || 5000}${
      req.url
    } Not found`,
  })
}

const generalError = (err, req, res, next) => {
  let customError = {
    status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  }

  if (err.name === "ValidationError") {
    customError.msg = "Please fill all fields"
    customError.status = StatusCodes.BAD_REQUEST
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`
    customError.status = StatusCodes.BAD_REQUEST
  }

  if (err.name === "CastError") {
    customError.msg = `No item found with id : ${err.value}`
    customError.status = StatusCodes.NOT_FOUND
  }

  return res.status(customError.status).json({ msg: customError.msg })
}

export { custom404, generalError }
