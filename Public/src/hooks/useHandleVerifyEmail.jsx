import { useState } from "react"
import { useUserContext } from "../UserContext"

const useHandleVerifyEmail = () => {
  const { setUser, url } = useUserContext()
  const [err, setErr] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const verifyEmail = async (verificationCode) => {
    setIsLoading(true)
    try {
      const res = await fetch(`${url}/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verificationCode }),
        credentials: "include",
      })

      if (!res.ok) {
        const { msg } = await res.json()

        setErr(msg)
        localStorage.removeItem("user")
        return setUser(null)
      }

      const user = await res.json()

      setUser(user)
    } catch (err) {
      setErr(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { err, setErr, isLoading, verifyEmail }
}

export default useHandleVerifyEmail
