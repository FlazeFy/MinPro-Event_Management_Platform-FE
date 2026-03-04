import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import AtomText from '../atoms/text.atom'

const colorVariants = {
    red: 'bg-red-100',
    green: 'bg-green-100',
    blue: 'bg-blue-100',
    gray: 'bg-gray-100',
} as const

type ColorVariant = keyof typeof colorVariants

interface IMoleculesNoDataBoxProps {
    title: string
    style?: React.CSSProperties
    color?: ColorVariant
}

const MoleculeNoDataBox: React.FC<IMoleculesNoDataBoxProps> = ({title, style, color = 'red'}) => {
    const bgColor = colorVariants[color]

    return (
        <div className={`${bgColor} my-2 rounded-xl py-10 w-full mx-auto flex flex-col items-center justify-center text-center p-2`} style={style}>
            <AtomText type="content-title" text="Oops!"/>
            <AtomText type="content" text={title} />
        </div>
    )
}

export default MoleculeNoDataBox