import React from 'react'
import AtomText from '../atoms/text.atom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Image from "next/image"
import { Badge } from '../ui/badge'

interface MoleculeTransactionBoxProps {
    title: string 
    desc: string 
    profileImage?: string
}

const MoleculeTransactionBox: React.FC<MoleculeTransactionBoxProps> = ({ title, desc, profileImage }) => {
    return (
        <div className='flex mb-3 items-center justify-between'>
            <div className='flex gap-3'>
                <div className={`rounded-xl w-12 h-12 flex items-center justify-center bg-blue-500 text-white`}>
                    {
                        profileImage ? 
                            <Image src={profileImage} alt='profile' width={40} height={40} className='w-10 h-10 rounded-lg object-cover' />
                        : 
                            <FontAwesomeIcon icon={faUser} className='w-6 h-6' />
                    }
                </div>
                <div>
                    <AtomText type='content' text={title} extraClass='font-semibold'/>
                    <AtomText type='label' text={desc}/>
                </div>
            </div>
            <Badge className='bg-green-200 text-green-700'>+200 Pts</Badge>
        </div>
    )
}

export default MoleculeTransactionBox