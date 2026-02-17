'use client'

import React from 'react'
import AtomText from '../atoms/text.atom'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { Button } from '../ui/button'

interface MoleculeCopyBoxProps {
    value: string
    context: string
}

const MoleculeCopyBox: React.FC<MoleculeCopyBoxProps> = ({ value, context }) => {
    const handleCopy = async () => {
        await navigator.clipboard.writeText(value)

        Swal.fire({
            icon: 'success',
            title: `Copied ${context}`,
            showConfirmButton: false,
            timer: 1500,
        })
    }

    return (
        <div className="bg-blue-400 mb-3 p-4 rounded-lg flex items-center justify-between shadow-[inset_0_6px_16px_rgba(0,0,0,0.35)]">
            <AtomText type="content" text={value} extraClass="text-white"/>
            <Button onClick={handleCopy} className='shadow-lg'><FontAwesomeIcon icon={faCopy}/></Button>
        </div>
    )
}

export default MoleculeCopyBox
