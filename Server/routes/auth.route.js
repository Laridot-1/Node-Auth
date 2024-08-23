import express from "express"
import {
  handleCreateUser,
  handleForgotPassword,
  handleLogin,
  handleLogout,
  handleResetVerifiedPassword,
  handleVerifyEmail,
} from "../controllers/auth.controller.js"

export const authRouter = express()

authRouter.route("/signup").post(handleCreateUser)
authRouter.route("/verify").post(handleVerifyEmail)
authRouter.route("/signout").post(handleLogout)
authRouter.route("/signin").post(handleLogin)
authRouter.route("/forgot-password").post(handleForgotPassword)
authRouter.route("/reset").post(handleResetVerifiedPassword)
