"use client"
import { useEffect } from "react"
import { LoginResponsePayload, refreshAuthToken } from "@/repositories/r_auth"
import useAuthStore from "@/store/s_auth"

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
  const { onLoginStore, onLogOutStore } = useAuthStore()

  useEffect(() => {
    refreshAuthToken()
      .then((res: LoginResponsePayload) => {
        // Store local data
        localStorage.setItem('token_key', res.token)

        // Store global state data
        onLoginStore({ name: res.name, email: res.email, role: res.role })
      })
      .catch(() => {
        onLogOutStore()
        localStorage.removeItem("token_key")
      })
  }, [onLoginStore, onLogOutStore])

  return <>{children}</>
}
