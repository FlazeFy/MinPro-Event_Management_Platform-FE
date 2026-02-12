import * as React from 'react'
import AtomText from '../atoms/text.atom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../ui/button'
import { faClock } from '@fortawesome/free-solid-svg-icons'

interface IMoleculeStepBoxProps {
    icon: any
    title: string 
    description: string
    time: number
}

const MoleculeStepBox: React.FunctionComponent<IMoleculeStepBoxProps> = ({ icon, title, description, time }) => {
    return (
        <div className='p-10 bg-blue-200 rounded-2xl text-start'>
            <Button variant='outline' className='bg-primary mb-5'>
                <FontAwesomeIcon icon={icon}/>
            </Button>
            <AtomText type='content-title' text={title}/>
            <AtomText type='content' text={description} extraClass='italic text-gray-500'/>
            <hr className='mt-4 mb-6 text-gray-500'/>
            <span className='flex items-center gap-1'>
                <FontAwesomeIcon icon={faClock} height={16} className='text-gray-500'/>
                <AtomText type='content' text={`${time} min`} extraClass='italic text-gray-500'/>
            </span>
        </div>
    )
}

export default MoleculeStepBox;
