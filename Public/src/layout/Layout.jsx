import { Outlet, useLocation } from "react-router-dom"
import { colors, Container } from "@mui/material"

const Layout = () => {
  const { pathname } = useLocation()

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        height: "100dvh",
        alignItems: pathname !== "/" && "center",
        justifyContent: pathname !== "/" && "center",
        backgroundImage: `linear-gradient(to bottom right, ${colors.grey[900]} 10%, ${colors.green[800]}, ${colors.green[900]})`,
      }}
    >
      <Outlet />
    </Container>
  )
}

export default Layout
