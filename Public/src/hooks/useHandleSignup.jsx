import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../UserContext"

const useHandleSignup = () => {
  const [err, setErr] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { url } = useUserContext()
  const navigate = useNavigate()

  const signup = async (name, email, password) => {
    setIsLoading(true)
    try {
      const res = await fetch(`${url}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
        credentials: "include",
      })

      if (!res.ok) {
        const { msg } = await res.json()
        return setErr(msg)
      }

      navigate("/verify")
    } catch (err) {
      setErr(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { err, setErr, isLoading, signup }
}

export default useHandleSignup
