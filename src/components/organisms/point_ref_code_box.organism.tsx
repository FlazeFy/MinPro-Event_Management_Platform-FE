"use client"
import * as React from 'react'
import AtomText from '../atoms/text.atom'
import AtomDivider from '../atoms/divider.atom'
import MoleculeNominalBox from '../molecules/nominal_box.molecule'
import MoleculeCopyBox from '../molecules/copy_box.molecule'

interface IOrganismsPointRefCodeBoxProps {
    points: number
    referral_code: string
}

const OrganismsPointRefCodeBox: React.FunctionComponent<IOrganismsPointRefCodeBoxProps> = ({ points, referral_code }) => {
    return (
        <div className='container'>
            <AtomText type='sub-title' text='Your Rewards' extraClass='mb-2'/>
            <MoleculeNominalBox label='Available Points' value={points}/>
            <AtomDivider/>
            <AtomText type='content' text='Ref Code' extraClass='mb-2'/>
            <MoleculeCopyBox value={referral_code} context='Referral Code'/>
        </div>
    )
}

export default OrganismsPointRefCodeBox;
