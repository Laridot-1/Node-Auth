import { Box, Button, colors, Stack, Typography } from "@mui/material"
import { Email } from "@mui/icons-material"

import Input from "../components/Input"

import { Link } from "react-router-dom"
import { useState } from "react"
import Toast from "../components/Toast"
import useHandleForgotPassword from "../hooks/useHandleForgotPassword"

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("")
  const { err, setErr, isLoading, forgotPassword, isFlipped } =
    useHandleForgotPassword()

  const handleForgotPassword = async () => {
    try {
      await forgotPassword(email)
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
      pb="auto"
    >
      <Stack gap={2.5} px={2.5}>
        <Typography
          variant="h1"
          textAlign="center"
          fontSize="1.5rem"
          color={colors.green["A400"]}
        >
          Forgotten Password
        </Typography>
        {!isFlipped ? (
          <Stack gap={2}>
            <Input
              icon={<Email />}
              type="email"
              placeholder="Email Address"
              size="small"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
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
              onClick={handleForgotPassword}
            >
              Send reset link
            </Button>
          </Stack>
        ) : (
          <Typography>
            A link has been sent to your email address {email}
          </Typography>
        )}
      </Stack>

      <Box
        mt={3}
        textAlign="center"
        py={2}
        color="white"
        bgcolor="black"
        sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
      >
        <Typography variant="body2">
          <Typography
            variant="body2"
            component={Link}
            to="/signin"
            sx={{ textDecoration: "none", color: colors.green[800] }}
          >
            Back to Login
          </Typography>
        </Typography>
      </Box>

      <Toast alert={err} setAlert={setErr} type="error" />
    </Stack>
  )
}

export default ForgotPasswordPage
