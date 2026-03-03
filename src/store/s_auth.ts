import { create } from "zustand"

type Role = "customer" | "event_organizer" | null

interface IAuthStore {
    name: string | null
    email: string | null
    role: Role
    isAuthenticated: boolean
    isHydrated: boolean
    onLoginStore: (data: { name: string; email: string; role: Role }) => void
    onLogOutStore: () => void
    setHydrated: (value: boolean) => void
}

const useAuthStore = create<IAuthStore>((set) => ({
    name: null,
    email: null,
    role: null,
    isAuthenticated: false,
    isHydrated: false,
    onLoginStore: (data) => {
        set(() => ({
            ...data,
            isAuthenticated: true,
        }))
    },
    onLogOutStore: () => {
        set(() => ({
            name: null,
            email: null,
            role: null,
            isAuthenticated: false,
        }))
    },

    setHydrated: (value) => set({ isHydrated: value }),
}))

export default useAuthStore