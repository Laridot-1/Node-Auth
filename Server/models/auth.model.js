import { model, Schema } from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const AuthSchema = new Schema(
  {
    name: {
      trim: true,
      type: String,
      required: true,
    },
    email: {
      trim: true,
      type: String,
      unique: true,
      required: true,
    },
    password: {
      trim: true,
      type: String,
      minLength: 6,
      required: true,
    },
    lastSeen: {
      type: Date,
      default: Date.now(),
    },
    verified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationCode: String,
    verificationCodeExpiresAt: Date,
  },
  {
    timestamps: true,
  }
)

AuthSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

AuthSchema.methods.createToken = function (time) {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: time,
  })
}

AuthSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const Auth = model("User", AuthSchema)

const createUser = (payload) => {
  return new Promise((resolve) => {
    const newUser = Auth.create(payload)
    resolve(newUser)
  })
}

const verifyEmail = (_id, verificationCode) => {
  return new Promise((resolve) => {
    const user = Auth.findOne({
      _id,
      verificationCode,
      verificationCodeExpiresAt: { $gt: Date.now() },
    })
    resolve(user)
  })
}

const verifyReset = (_id, resetPasswordToken) => {
  return new Promise((resolve) => {
    const user = Auth.findOne({
      _id,
      resetPasswordToken,
      resetPasswordExpiresAt: { $gt: Date.now() },
    })
    resolve(user)
  })
}

const updateField = (field, value) => {
  return new Promise((resolve) => {
    const updatedUser = Auth.findOneAndUpdate(field, value, { new: true })
    resolve(updatedUser)
  })
}

const getUser = (email) => {
  return new Promise((resolve) => {
    const user = Auth.findOne({ email })
    resolve(user)
  })
}

const getProfile = (_id) => {
  return new Promise((resolve) => {
    const user = Auth.findOne({ _id }).select("-password")
    resolve(user)
  })
}

export {
  createUser,
  verifyEmail,
  updateField,
  getUser,
  verifyReset,
  getProfile,
}
