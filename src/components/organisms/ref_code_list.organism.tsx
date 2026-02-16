"use client"
import * as React from 'react'
import AtomText from '../atoms/text.atom'
import MoleculeTransactionBox from '../molecules/transaction_molecule'

interface IOrganismsRefCodeListProps {}

const OrganismsRefCodeList: React.FunctionComponent<IOrganismsRefCodeListProps> = () => {
    return (
        <div className="box-bordered">
            <AtomText type='sub-title-small' text='Referral History'/>
            <br/>
            <MoleculeTransactionBox title='Budi' desc='Joined at 2 Feb 2026' profileImage='/images/user.jpg'/>
            <MoleculeTransactionBox title='Audy' desc='Joined at 10 Jan 2026'/>
            <MoleculeTransactionBox title='Lisa' desc='Joined at 9 Dec 2025'/>
        </div>
    )
}

export default OrganismsRefCodeList;
