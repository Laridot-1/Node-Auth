import dotenv from "dotenv"
dotenv.config()

import express from "express"
import "express-async-errors"
import { connect } from "mongoose"

import erl from "express-rate-limit"
import cors from "cors"
import helmet from "helmet"

import cookieParser from "cookie-parser"

import { custom404, generalError } from "./middlewares/errorHandlers.js"
import { authRouter } from "./routes/auth.route.js"
import { auth } from "./middlewares/auth.middleware.js"
import { profileRouter } from "./routes/profile.route.js"

import { error, log } from "console"
import path from "path"

const app = express()

// Security
app.set("trust proxy", 1)
app.use(
  erl({
    windowMs: 5 * 60 * 1000,
    max: 100,
  })
)
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(helmet())

app.use(cookieParser())

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Route
app.use("/api/auth", authRouter)
app.use("/api/profile", auth, profileRouter)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "/Public/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(path.resolve(), "Public", "dist", "index.html"))
  })
}

// Error Handlers
app.use(custom404)
app.use(generalError)

// DB Connection && Server Spin Up
try {
  await connect(process.env.MONGO_URI)
  app.listen(
    process.env.PORT || 5000,
    log(`Server listening on port ${process.env.PORT || 5000}`)
  )
} catch (err) {
  error(err.message)
  process.exit(1)
}
