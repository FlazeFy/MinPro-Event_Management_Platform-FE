import React from 'react'
import AtomText from '../atoms/text.atom'
import { Button } from '../ui/button'
import Link from "next/link"

interface MoleculeNavigationBarProps {}

const MoleculeNavigationBar: React.FC<MoleculeNavigationBarProps> = () => {
    return (
        <nav className="sticky top-0 z-50 bg-white flex flex-col md:flex-row justify-center md:justify-between items-center border-b border-gray-400 pt-5 text-center md:text-left p-5">
            <AtomText type='content-title' text='EventKu' extraClass='font-bold text-primary'/>
            <div className='flex gap-10'>
                <AtomText type='content-title' text='Features'/>
                <Link href={'/events'}>
                    <AtomText type='content-title' text='Events'/>
                </Link>
                <Link href={'/about'}>
                    <AtomText type='content-title' text='About'/>
                </Link>
                <Link href={'/feedback'}>
                    <AtomText type='content-title' text='Feedback'/>
                </Link>
            </div>
            <Button>Sign In</Button>
        </nav>
    )
}

export default MoleculeNavigationBar