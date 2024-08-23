import { Navigate, Route, Routes } from "react-router-dom"

import Layout from "./layout/Layout"
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage"
import SigninPage from "./pages/SigninPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import VerifyEmailPage from "./pages/VerifyEmailPage"
import { useUserContext } from "./UserContext"

function App() {
  const { user } = useUserContext()

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            !user ? (
              <Navigate to="/signin" />
            ) : !user.verified ? (
              <Navigate to="/verify" />
            ) : (
              <HomePage />
            )
          }
        />
        <Route
          path="signup"
          element={
            user?.verified ? <Navigate to="/" replace /> : <SignupPage />
          }
        />
        <Route
          path="signin"
          element={
            user?.verified ? <Navigate to="/" replace /> : <SigninPage />
          }
        />
        <Route
          path="verify"
          element={
            user?.verified ? <Navigate to="/" replace /> : <VerifyEmailPage />
          }
        />
        <Route path="reset" element={<ResetPasswordPage />} />
        <Route
          path="forgot-password"
          element={
            user?.verified ? (
              <Navigate to="/" replace />
            ) : (
              <ForgotPasswordPage />
            )
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
