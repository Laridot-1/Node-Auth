import {
  Box,
  Button,
  colors,
  IconButton,
  Stack,
  Typography,
} from "@mui/material"
import { useUserContext } from "../UserContext"
import useHandleLogout from "../hooks/useHandleLogout"
import Toast from "../components/Toast"

const HomePage = () => {
  const { user } = useUserContext()
  const { err, setErr, isLoading, logout } = useHandleLogout()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <Stack width="100%" gap={2}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={4}
        p={2}
        component="header"
        borderBottom={`1px solid ${colors.green[800]}`}
      >
        <Typography
          variant="h1"
          textAlign="center"
          fontSize="1.5rem"
          color={colors.green[800]}
        >
          Dashboard
        </Typography>
        <Button
          variant="contained"
          sx={{
            borderRadius: "100vmax",
            backgroundColor: "transparent",
            backgroundImage: `linear-gradient(to right, ${colors.green[400]}, ${colors.green[900]})`,
            "&:hover": {
              transform: "scale(0.985)",
            },
            transition: "0.1s",
          }}
          disabled={isLoading}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Stack>

      <Stack>
        <Typography
          variant="h2"
          textAlign="center"
          fontSize="1.5rem"
          color={colors.green["A400"]}
        >
          Welcome {user?.name}
        </Typography>
      </Stack>

      <Toast alert={err} setAlert={setErr} type="error" />
    </Stack>
  )
}

export default HomePage
