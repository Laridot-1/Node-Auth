import { Box, Button, colors, Stack, Typography } from "@mui/material"
import { Email, Password } from "@mui/icons-material"

import Input from "../components/Input"

import { Link } from "react-router-dom"
import { useState } from "react"
import useHandleSignin from "../hooks/useHandleSignin"
import Toast from "../components/Toast"

const SigninPage = () => {
  const [val, setVal] = useState({
    email: "",
    password: "",
  })
  const { err, setErr, isLoading, signin } = useHandleSignin()

  const handleChange = (e) => {
    setVal({ ...val, [e.target.name]: e.target.value })
  }

  const handleSignin = async () => {
    try {
      await signin(val.email, val.password)
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
          Welcome Back
        </Typography>
        <Stack gap={2}>
          <Input
            icon={<Email />}
            type="email"
            placeholder="Email Address"
            size="small"
            value={val.email}
            handleChange={handleChange}
          />
          <Input
            icon={<Password />}
            type="password"
            placeholder="Password"
            size="small"
            value={val.password}
            handleChange={handleChange}
          />

          <Typography
            variant="body2"
            component={Link}
            to="/forgot-password"
            sx={{
              textDecoration: "none",
              color: colors.green[800],
              width: "fit-content",
            }}
          >
            Forgotten Password?
          </Typography>

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
            disabled={isLoading}
            onClick={handleSignin}
          >
            Signin
          </Button>
        </Stack>
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
          Don't have an account?{" "}
          <Typography
            variant="body2"
            component={Link}
            to="/signup"
            sx={{ textDecoration: "none", color: colors.green[800] }}
          >
            Signup
          </Typography>
        </Typography>
      </Box>

      <Toast alert={err} setAlert={setErr} type="error" />
    </Stack>
  )
}

export default SigninPage
