import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import AtomText from '../atoms/text.atom'

interface IMoleculesNotDataBoxProps {
    title: string
    style?: any
}

const MoleculeNotDataBox: React.FunctionComponent<IMoleculesNotDataBoxProps> = ({ title, style }) => {
    return (    
        <div className="bg-red-100 mt-2 rounded-xl py-10 w-full mx-auto flex flex-col items-center justify-center text-center" style={style}>
            <AtomText type='content-title' text={<><FontAwesomeIcon icon={faTriangleExclamation}/> Oops!</>}/>
            <AtomText type='content' text={title}/>
        </div>
    )
}

export default MoleculeNotDataBox