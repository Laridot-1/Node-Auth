import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../UserContext"

const useHandleResetPassword = () => {
  const [err, setErr] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { url } = useUserContext()

  const resetPassword = async (password, token) => {
    setIsLoading(true)
    try {
      const res = await fetch(`${url}/auth/reset`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ password, token }),
      })

      if (!res.ok) {
        const { msg } = await res.json()
        return setErr(msg)
      }

      navigate("/signin")
    } catch (err) {
      setErr(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { err, setErr, isLoading, resetPassword }
}

export default useHandleResetPassword
