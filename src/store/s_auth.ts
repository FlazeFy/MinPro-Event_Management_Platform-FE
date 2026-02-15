import { create } from "zustand"

interface IAuthStore {
    name: string
    email: string
    role: string
    onLoginStore: (data: Partial<IAuthStore>) => void 
    onLogOutStore: () => void
}

const useAuthStore = create<IAuthStore>((set) => ({
    name: "", email: "", role: "",
    onLoginStore: (data) => {
        set(() => ({
            ...data,
        }))
    },
    onLogOutStore: () => {
        set(() => ({
            name: "", email: "", role: "",
        }))
    },
}))

export default useAuthStore
