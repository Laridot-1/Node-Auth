import { Button, colors, Stack, Typography } from "@mui/material"
import { Password } from "@mui/icons-material"

import Input from "../components/Input"

import { useState } from "react"
import Toast from "../components/Toast"
import useHandleResetPassword from "../hooks/useHandleResetPassword"
import { useNavigate } from "react-router-dom"

const ResetPasswordPage = () => {
  const [val, setVal] = useState({
    password: "",
    confirmPassword: "",
  })
  const { err, setErr, isLoading, resetPassword } = useHandleResetPassword()
  const [token] = useState(() => {
    return new URL(location.href).searchParams.get("token")
  })

  const handleChange = (e) => {
    setVal({ ...val, [e.target.name]: e.target.value })
  }

  const handleResetPassword = async () => {
    if (val.password !== val.confirmPassword) {
      return setErr("Passwords do not match")
    }

    try {
      await resetPassword(val.password, token)
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
    >
      <Stack gap={2.5} px={2.5}>
        <Typography
          variant="h1"
          textAlign="center"
          fontSize="1.5rem"
          color={colors.green["A400"]}
        >
          Reset Password
        </Typography>
        <Stack gap={2}>
          <Input
            icon={<Password />}
            type="password"
            placeholder="Password"
            size="small"
            value={val.password}
            handleChange={handleChange}
          />

          <Input
            icon={<Password />}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            size="small"
            value={val.confirmPassword}
            handleChange={handleChange}
          />

          <Button
            variant="contained"
            sx={{
              backgroundColor: "transparent",
              backgroundImage: `linear-gradient(to right, ${colors.green[400]}, ${colors.green[900]})`,
              "&:hover": {
                transform: "scale(0.985)",
              },
              transition: "0.1s",
              textTransform: "capitalize",
            }}
            disabled={isLoading}
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </Stack>
      </Stack>

      <Toast alert={err} setAlert={setErr} type="error" />
    </Stack>
  )
}

export default ResetPasswordPage
