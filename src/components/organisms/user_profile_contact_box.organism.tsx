import * as React from 'react'
import AtomText from '../atoms/text.atom'
import AtomDivider from '../atoms/divider.atom';
import { faBuilding, faEnvelope, faLocationDot, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import MoleculeIdentityBox from '../molecules/identity_box.molecule';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../ui/button';
import { SocialMedia } from '@/repositories/r_auth';
import Link from 'next/link';

interface IOrganismUserProfileContactBoxProps {
    fullname: string 
    email: string 
    phone_number: string
    address: string | null
    role: string
    social_media: SocialMedia[]
}

const OrganismUserProfileContactBox: React.FunctionComponent<IOrganismUserProfileContactBoxProps> = ({ fullname, email, phone_number, address, role, social_media }) => {
    const socialIconMap: Record<string, any> = {
        facebook: faFacebook,
        instagram: faInstagram,
        tiktok: faTiktok,
    }

    return (
        <div className="box-bordered">
            <AtomText type='sub-title-small' text='Contact'/>
            <AtomDivider/>
            <MoleculeIdentityBox icon={role === "customer" ? faUser : faBuilding} label={role === "customer" ? 'Fullname' : 'Organizer Name'} value={fullname}/>
            <MoleculeIdentityBox icon={faEnvelope} label='Email' value={email}/>
            <MoleculeIdentityBox icon={faPhone} label='Phone' value={phone_number}/>
            { 
                role === "event_organizer" && address && <>
                    <MoleculeIdentityBox icon={faLocationDot} label='Address' value={address}/> 
                    <AtomDivider/>
                    <div className='flex gap-2'>
                        {
                            social_media?.map((item) => {
                                const icon = socialIconMap[item.social_media_platform]
                                if (!icon) return null

                                return (
                                    <Link key={item.social_media_platform} href={item.social_media_url}>
                                        <Button variant="secondary"><FontAwesomeIcon icon={icon}/></Button>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </>
            }                        
        </div>
    )
}

export default OrganismUserProfileContactBox;
