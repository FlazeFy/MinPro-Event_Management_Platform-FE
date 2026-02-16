"use client"
import * as React from 'react'
import AtomText from '../atoms/text.atom'
import MoleculeTransactionBox from '../molecules/transaction_molecule'
import { convertUTCToLocal } from '@/helpers/converter.helper'
import { OwnerReferralCodeHistory } from '@/repositories/r_auth'
import MoleculeNotDataBox from '../molecules/no_data_box.molecule'

interface IOrganismsRefCodeListProps {
    customers: OwnerReferralCodeHistory[]
}

const OrganismsRefCodeList: React.FunctionComponent<IOrganismsRefCodeListProps> = ({ customers }) => {
    return (
        <div className="box-bordered">
            <AtomText type='sub-title-small' text='Referral History'/>
            <br/>
            {
                customers.length > 0 ? 
                    customers.map((dt, idx) => (
                        <MoleculeTransactionBox key={idx} 
                            title={dt.customer_user.username} desc={`Joined at ${convertUTCToLocal(dt.customer_user.created_at, true, false)}`} 
                            profileImage={dt.customer_user.profile_pic ?? '/images/user.jpg'}/>
                    ))
                :
                    <MoleculeNotDataBox title="Your referral code hasn't been used yet"/>
            }
        </div>
    )
}

export default OrganismsRefCodeList;
