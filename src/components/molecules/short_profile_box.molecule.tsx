import * as React from 'react'
import AtomText from '../atoms/text.atom'

interface IMoleculeShortProfileBoxProps {
    image?: string
    title: string
    description: string
    descriptionClassName?: string
}

const MoleculeShortProfileBox: React.FunctionComponent<IMoleculeShortProfileBoxProps> = ({ image, title, description, descriptionClassName }) => {
    return (
        <div className='flex flex-col md:flex-row justify-center md:justify-start items-center gap-4 mb-3 text-center md:text-left'>
            <div className="w-16 h-16 relative rounded-full overflow-hidden border border-secondary bg-secondary flex items-center justify-center shrink-0">
                {image ? (
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                ) : (
                    <span className="text-xl font-bold text-secondary-foreground">{title.charAt(0)}</span>
                )}
            </div>
            <div>
                <AtomText type='content-title' text={title} />
                <AtomText type='content' text={description} extraClass={`italic ${descriptionClassName || 'text-white'}`} />
            </div>
        </div>
    )
}

export default MoleculeShortProfileBox;
