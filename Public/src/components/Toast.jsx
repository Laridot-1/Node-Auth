import { Alert, Snackbar } from "@mui/material"

const Toast = ({ alert, setAlert, type }) => {
  return (
    <Snackbar
      open={Boolean(alert)}
      autoHideDuration={5000}
      onClose={() => setAlert("")}
    >
      <Alert onClose={() => setAlert("")} severity={type}>
        {alert}
      </Alert>
    </Snackbar>
  )
}

export default Toast
