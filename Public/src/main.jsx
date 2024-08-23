import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { CssBaseline } from "@mui/material"
import { BrowserRouter } from "react-router-dom"
import { BaseTheme } from "./BaseTheme.jsx"
import { UserContext } from "./UserContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserContext>
      <BaseTheme>
        <CssBaseline enableColorScheme />
        <App />
      </BaseTheme>
    </UserContext>
  </BrowserRouter>
)
