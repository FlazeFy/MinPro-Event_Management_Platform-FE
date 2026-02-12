import * as React from 'react'
import AtomText from '../atoms/text.atom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../ui/button'

interface IMoleculeBenefitBoxProps {
    icon: any
    title: string 
    description: string
}

const MoleculeBenefitBox: React.FunctionComponent<IMoleculeBenefitBoxProps> = ({ icon, title, description  }) => {
    return (
        <div className='flex justify-start items-center gap-4 mb-3'>
            <Button variant='outline' className='bg-secondary'>
                <FontAwesomeIcon icon={icon}/>
            </Button>
            <div>
                <AtomText type='content-title' text={title}/>
                <AtomText type='content' text={description} extraClass='italic text-gray-500'/>
            </div>
        </div>
    )
}

export default MoleculeBenefitBox;
