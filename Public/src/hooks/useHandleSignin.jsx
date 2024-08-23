import { useState } from "react"
import { useUserContext } from "../UserContext"

const useHandleSignin = () => {
  const [err, setErr] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { setUser, url } = useUserContext()

  const signin = async (email, password) => {
    setIsLoading(true)
    try {
      const res = await fetch(`${url}/auth/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const { msg } = await res.json()
        setErr(msg)
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

  return { err, setErr, isLoading, signin }
}

export default useHandleSignin
