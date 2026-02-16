import * as React from 'react'
import AtomText from '../atoms/text.atom'
import AtomDivider from '../atoms/divider.atom';
import { faEnvelope, faLocationDot, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import MoleculeIdentityBox from '../molecules/identity_box.molecule';

interface IOrganismsUserProfileContactBoxProps {
    fullname: string 
    email: string 
    phone_number: string
    address: string | null
    role: string
}

const OrganismsUserProfileContactBox: React.FunctionComponent<IOrganismsUserProfileContactBoxProps> = ({ fullname, email, phone_number, address, role }) => {
    return (
        <div className="box-bordered">
            <AtomText type='sub-title-small' text='Contact'/>
            <AtomDivider/>
            <MoleculeIdentityBox icon={faUser} label='Fullname' value={fullname}/>
            <MoleculeIdentityBox icon={faEnvelope} label='Email' value={email}/>
            <MoleculeIdentityBox icon={faPhone} label='Phone' value={phone_number}/>
            {
                role === "admin" && address && <MoleculeIdentityBox icon={faLocationDot} label='Address' value={address}/>
            }                        
        </div>
    )
}

export default OrganismsUserProfileContactBox;
