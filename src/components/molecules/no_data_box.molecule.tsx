import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import AtomText from '../atoms/text.atom'

interface IMoleculesNoDataBoxProps {
    title: string
    style?: any
}

const MoleculeNoDataBox: React.FunctionComponent<IMoleculesNoDataBoxProps> = ({ title, style }) => {
    return (    
        <div className="bg-red-100 my-2 rounded-xl py-10 w-full mx-auto flex flex-col items-center justify-center text-center" style={style}>
            <AtomText type='content-title' text={<><FontAwesomeIcon icon={faTriangleExclamation}/> Oops!</>}/>
            <AtomText type='content' text={title}/>
        </div>
    )
}

export default MoleculeNoDataBox