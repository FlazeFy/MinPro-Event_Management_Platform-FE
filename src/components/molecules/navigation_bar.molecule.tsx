"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../ui/button"
import useAuthStore from "@/store/s_auth"

interface MoleculeNavigationBarProps {}

const MoleculeNavigationBar: React.FC<MoleculeNavigationBarProps> = () => {
    const { email, role, isAuthenticated } = useAuthStore()
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const selectedMenu =
        pathname === "/event" ? "Event"
        : pathname === "/feedback" ? "Feedback"
        : pathname === "/transaction" ? "Transaction"
        : pathname === "/about" ? "About"
        : "Home"

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-300">
            <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
                <Link href="/"><span className="font-bold text-primary text-lg">EventKu</span></Link>
                <div className="hidden lg:flex gap-10 items-center">
                    <Link href="/">Home</Link>
                    <Link href="/event">Event</Link>
                    { isAuthenticated && role === "event_organizer" && <Link href="/transaction">Transaction</Link> }
                    { isAuthenticated && <Link href="/feedback">Feedback</Link> }
                    <Link href="/about">About</Link>
                    <Link href="/profile">
                        <Button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2">
                            <FontAwesomeIcon icon={faUser}/>{email}
                        </Button>
                    </Link>
                </div>
                <div className="flex items-center gap-4 lg:hidden">
                    <Button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 font-semibold">
                        <FontAwesomeIcon icon={faBars}/>{selectedMenu}
                    </Button>
                    <Link href="/profile">
                        <Button className="bg-primary text-white px-3 py-2 rounded-lg flex items-center gap-2">
                            <FontAwesomeIcon icon={faUser}/>
                            <span className="hidden md:inline">{email}</span>
                        </Button>
                    </Link>
                </div>
            </div>
            <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-5 pb-4 flex flex-col gap-4 border-t border-gray-200">
                    <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link href="/event" onClick={() => setIsOpen(false)}>Event</Link>
                    { isAuthenticated && role === "event_organizer" && <Link href="/transaction" onClick={() => setIsOpen(false)}>Transaction</Link> }
                    { isAuthenticated && <Link href="/feedback" onClick={() => setIsOpen(false)}>Feedback</Link> }
                    <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
                </div>
            </div>
        </nav>
    )
}

export default MoleculeNavigationBar