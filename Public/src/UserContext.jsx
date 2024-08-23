import { createContext, useContext, useEffect, useState } from "react"
import Toast from "./components/Toast"
import { useLocation } from "react-router-dom"
import { LinearProgress } from "@mui/material"

const userAuth = createContext(null)

const useUserContext = () => useContext(userAuth)

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null)
  const [err, setErr] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { pathname } = useLocation()
  const url =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api"

  useEffect(() => {
    const handleGetProfile = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`${url}/profile`, {
          credentials: "include",
          method: "GET",
        })

        if (!res.ok) {
          if (pathname === "/") {
            setErr("Unauthorized")
          }
          return setUser(null)
        }

        const { user } = await res.json()
        setUser(user)
      } catch (err) {
        setUser(null)
        setErr(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    handleGetProfile()
  }, [])

  const obj = {
    url,
    user,
    setUser,
    isLoading,
  }

  return (
    <userAuth.Provider value={obj}>
      {isLoading && <LinearProgress color="success" />}
      {children}
      <Toast alert={err} setAlert={setErr} type="error" />
    </userAuth.Provider>
  )
}

export { UserContext, useUserContext }
