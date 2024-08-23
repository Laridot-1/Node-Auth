import express from "express"
import { handleGetProfile } from "../controllers/profile.controller.js"

export const profileRouter = express()

profileRouter.route("/").get(handleGetProfile)
