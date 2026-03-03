"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import useAuthStore from "@/store/s_auth"

interface RoleGuardProps {
    allowedRoles: ("customer" | "event_organizer")[]
    children: React.ReactNode
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
    const router = useRouter()
    const { role, isAuthenticated, isHydrated } = useAuthStore()

    useEffect(() => {
        if (!isHydrated) return

        if (!isAuthenticated) {
            router.replace("/")
            return
        }

        if (!role || !allowedRoles.includes(role)) router.replace("/unauthorized")
    }, [role, isAuthenticated, isHydrated, allowedRoles, router])

    if (!isHydrated) return null
    if (!isAuthenticated) return null
    if (!role || !allowedRoles.includes(role)) return null

    return <>{children}</>
}