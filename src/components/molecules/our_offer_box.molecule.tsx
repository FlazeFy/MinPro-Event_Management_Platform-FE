import * as React from 'react'
import AtomText from '../atoms/text.atom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../ui/button'

interface IMoleculeOfferBoxProps {
    icon: any
    title: string 
    content: any
}

const MoleculeOfferBox: React.FunctionComponent<IMoleculeOfferBoxProps> = ({ icon, title, content }) => {
    return (
        <div className='p-10 bg-blue-200 rounded-2xl text-start'>
            <Button variant='outline' className='bg-primary mb-5'>
                <FontAwesomeIcon icon={icon}/>
            </Button>
            <AtomText type='content-title' text={title}/>
            {content}
        </div>
    )
}

export default MoleculeOfferBox;
