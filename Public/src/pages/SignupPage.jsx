import { useState } from "react"
import { Link } from "react-router-dom"

import { Email, Password, Person } from "@mui/icons-material"
import { Box, Button, colors, Stack, Typography } from "@mui/material"

import Toast from "../components/Toast"
import Input from "../components/Input"
import useHandleSignup from "../hooks/useHandleSignup"

const SignupPage = () => {
  const [val, setVal] = useState({
    name: "",
    email: "",
    password: "",
  })
  const { err, setErr, isLoading, signup } = useHandleSignup()

  const handleChange = (e) => {
    setVal({ ...val, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!val.name || !val.email || !val.password) {
      return setErr("Please fill all fields")
    }

    try {
      await signup(val.name, val.email, val.password)
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
          Create Account
        </Typography>
        <Stack gap={2}>
          <Input
            icon={<Person />}
            type="text"
            placeholder="Name"
            size="small"
            value={val.name}
            handleChange={handleChange}
          />
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
            onClick={handleSubmit}
          >
            Signup
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
          Already have an account?{" "}
          <Typography
            variant="body2"
            component={Link}
            to="/signin"
            sx={{ textDecoration: "none", color: colors.green[800] }}
          >
            Signin
          </Typography>
        </Typography>
      </Box>

      <Toast alert={err} setAlert={setErr} type="error" />
    </Stack>
  )
}

export default SignupPage
