"use client"
import { useEffect } from "react"
import { LoginResponsePayload, refreshAuthToken } from "@/repositories/r_auth"
import useAuthStore from "@/store/s_auth"

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { onLoginStore, onLogOutStore, setHydrated } = useAuthStore()

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res: LoginResponsePayload = await refreshAuthToken()

        localStorage.setItem("token_key", res.token)

        onLoginStore({
          name: res.name,
          email: res.email,
          role: res.role as any,
        })
      } catch {
        onLogOutStore()
        localStorage.removeItem("token_key")
      } finally {
        setHydrated(true)
      }
    }

    initAuth()
  }, [onLoginStore, onLogOutStore, setHydrated])

  return <>{children}</>
}