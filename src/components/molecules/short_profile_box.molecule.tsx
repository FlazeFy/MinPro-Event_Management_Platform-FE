import * as React from 'react'
import AtomText from '../atoms/text.atom'
import Image from 'next/image'

interface IMoleculeShortProfileBoxProps {
    image?: string
    title: string
}

const MoleculeShortProfileBox: React.FunctionComponent<IMoleculeShortProfileBoxProps> = ({ image, title }) => {
    const displayImage = image || "/images/user.png"

    return (
        <div className='flex flex-col md:flex-row justify-center md:justify-start items-center gap-4 mb-3 text-center md:text-left'>
            <div className="w-12 h-12 relative rounded-full overflow-hidden border border-white bg-white flex items-center justify-center shrink-0">
                <Image src={displayImage} alt={displayImage} className="w-full h-full object-cover" width={100} height={100}/>
            </div>
            <div>
                <AtomText type='content' text='Organized By' extraClass='italic text-sm'/>
                <AtomText type='content' text={title} extraClass='text-lg font-semibold'/>
            </div>
        </div>
    )
}

export default MoleculeShortProfileBox;
