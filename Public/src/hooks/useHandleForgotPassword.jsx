import { useState } from "react"
import { useUserContext } from "../UserContext"

const useHandleForgotPassword = () => {
  const [err, setErr] = useState("")
  const [isFlipped, setIsFlipped] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { url } = useUserContext()

  const forgotPassword = async (email) => {
    setIsLoading(true)
    try {
      const res = await fetch(`${url}/auth/forgot-password`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const { msg } = await res.json()
        return setErr(msg)
      }

      setIsFlipped(true)
    } catch (err) {
      setErr(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { err, setErr, isLoading, isFlipped, forgotPassword }
}

export default useHandleForgotPassword
