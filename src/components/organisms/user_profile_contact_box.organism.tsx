import * as React from 'react'
import AtomText from '../atoms/text.atom'
import AtomDivider from '../atoms/divider.atom';
import { faEnvelope, faLocationDot, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import MoleculeIdentityBox from '../molecules/identity_box.molecule';

interface IOrganismsUserProfileContactBoxProps {}

const OrganismsUserProfileContactBox: React.FunctionComponent<IOrganismsUserProfileContactBoxProps> = () => {
    return (
        <div className="box-bordered">
            <AtomText type='sub-title-small' text='Contact'/>
            <AtomDivider/>
            <MoleculeIdentityBox icon={faUser} label='Fullname' value='Jhon Doe'/>
            <MoleculeIdentityBox icon={faEnvelope} label='Email' value='jhon@gmail.com'/>
            <MoleculeIdentityBox icon={faPhone} label='Phone' value='08123456789'/>            
            <MoleculeIdentityBox icon={faLocationDot} label='Address' value='Jl. Gatot Soebroto'/>            
        </div>
    )
}

export default OrganismsUserProfileContactBox;
