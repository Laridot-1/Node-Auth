import { useState } from "react"
import { useUserContext } from "../UserContext"

const useHandleLogout = () => {
  const [err, setErr] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { setUser, url } = useUserContext()

  const logout = async () => {
    setIsLoading(true)
    try {
      await fetch(`${url}/auth/signout`, {
        method: "POST",
        credentials: "include",
      })
      setUser(null)
    } catch (err) {
      setErr(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { err, setErr, isLoading, logout }
}

export default useHandleLogout
