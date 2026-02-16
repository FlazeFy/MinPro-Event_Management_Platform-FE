'use client'
import React from 'react'
import AtomText from '../atoms/text.atom'
import { Button } from '../ui/button'
import Link from "next/link"
import useAuthStore from '@/store/s_auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignIn, faUser } from '@fortawesome/free-solid-svg-icons'

interface MoleculeNavigationBarProps {}

const MoleculeNavigationBar: React.FC<MoleculeNavigationBarProps> = () => {
    const { email } = useAuthStore()
    const isSignedIn = email !== ""

    return (
        <nav className="sticky top-0 z-50 bg-white flex flex-col md:flex-row justify-center md:justify-between items-center border-b border-gray-400 pt-5 text-center md:text-left p-5">
            <Link href={'/'}>
                <AtomText type='content-title' text='EventKu' extraClass='font-bold text-primary'/>
            </Link>
            <div className='flex gap-10'>
                <Link href={ isSignedIn ? '/' : '#feature-section' }>
                    <AtomText type='content-title' text={ isSignedIn ? "Home" : "Features" }/>
                </Link>
                <Link href={'/events'}>
                    <AtomText type='content-title' text='Events'/>
                </Link>
                {
                    isSignedIn && 
                        <Link href={'/transaction'}>
                            <AtomText type='content-title' text='Transaction'/>
                        </Link>
                }
                <Link href={'/about'}>
                    <AtomText type='content-title' text='About'/>
                </Link>
                <Link href={'/feedback'}>
                    <AtomText type='content-title' text='Feedback'/>
                </Link>
            </div>
            <Button>
                { 
                    isSignedIn ? 
                        <Link href='/profile'>
                            <FontAwesomeIcon icon={faUser}/> {email}
                        </Link> 
                    : 
                        <Link href='/'>
                            <FontAwesomeIcon icon={faSignIn}/> Sign In
                        </Link> 
                }
            </Button>
        </nav>
    )
}

export default MoleculeNavigationBar