import React from 'react'
import AtomText from '../atoms/text.atom'

interface MoleculeFooterBarProps {}

const MoleculeFooterBar: React.FC<MoleculeFooterBarProps> = () => {
    return (
        <footer className="flex flex-col md:flex-row justify-center md:justify-between items-center border-t border-gray-400 pt-5 text-center md:text-left p-5">
            <AtomText type='content-title' text='EventKu' extraClass='font-bold text-primary'/>
            <AtomText type='content-title' text='@2026. All Rights Reserved'/>
        </footer>
    )
}

export default MoleculeFooterBar