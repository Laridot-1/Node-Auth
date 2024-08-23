import { useRef, useState } from "react"

import { Button, colors, Stack, Typography } from "@mui/material"

import Toast from "../components/Toast"
import Input from "../components/Input"
import useHandleVerifyEmail from "../hooks/useHandleVerifyEmail"

const VerifyEmailPage = () => {
  const inputRefs = useRef([])
  const [code, setCode] = useState(Array(6).fill(""))
  const { err, setErr, isLoading, verifyEmail } = useHandleVerifyEmail()
  const [message, setMessage] = useState("")

  const canVerify = code.every((digit) => digit !== "")

  const handleChange = (e, index) => {
    const newValue = e.target.value

    if (/^\d?$/.test(newValue)) {
      const newValues = [...code]
      newValues[index] = newValue
      setCode(newValues)

      if (newValue && index < 5) {
        inputRefs.current[index + 1].focus()
      }
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleSubmit = async () => {
    try {
      const verificationCode = code.join("")

      await verifyEmail(verificationCode)

      const user = JSON.parse(localStorage.getItem("user"))

      if (user) {
        setMessage("email verified successfully")
      }
    } catch (err) {
      setErr(err.message)
    }
  }

  return (
    <Stack
      bgcolor={colors.grey[900]}
      sx={{
        opacity: 0.5,
      }}
      borderRadius={2}
      boxShadow={10}
      py={3}
      px={2.5}
      gap={2.5}
      maxWidth={400}
    >
      <Stack gap={1}>
        <Typography
          variant="h1"
          textAlign="center"
          fontSize="1.5rem"
          color={colors.green["A400"]}
        >
          Verify Email
        </Typography>
        <Typography
          component="p"
          variant="body2"
          color={colors.grey[50]}
          textAlign="center"
        >
          Enter the 6 digit code sent to your email
        </Typography>
      </Stack>
      <Stack direction="row" gap={1}>
        {code.map((val, i) => {
          return (
            <Input
              type="text"
              size="medium"
              verify={true}
              key={i}
              handleChange={handleChange}
              index={i}
              value={val}
              handleKeyDown={handleKeyDown}
              inputRef={(el) => (inputRefs.current[i] = el)}
            />
          )
        })}
      </Stack>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "transparent",
          backgroundImage: `linear-gradient(to right, ${colors.green[400]}, ${colors.green[900]})`,
          "&:hover": {
            transform: "scale(0.985)",
          },
          transition: "0.1s",
        }}
        disabled={!canVerify || isLoading}
        onClick={handleSubmit}
      >
        Verify Email
      </Button>

      {err && <Toast alert={err} setAlert={setErr} type="error" />}
      {message && (
        <Toast alert={message} setAlert={setMessage} type="success" />
      )}
    </Stack>
  )
}

export default VerifyEmailPage
