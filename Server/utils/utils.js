import jwt from "jsonwebtoken"
import { randomInt } from "crypto"
import mailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transport = {
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
}

const transporter = mailer.createTransport(transport)

const sendEmail = async (email, message, subject) => {
  return await transporter.sendMail({
    from: `LariBot ${process.env.EMAIL}`,
    to: email,
    subject: subject,
    html: message,
  })
}

const generateCode = () => {
  return randomInt(100000, 999999)
}

const setCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
  })
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

export { setCookie, generateCode, sendEmail, verifyToken }
