import * as React from 'react'
import AtomText from '../atoms/text.atom'
import { faPenToSquare, faSignOut } from '@fortawesome/free-solid-svg-icons'
import Image from "next/image"
import { Button } from '../ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge } from '../ui/badge'

interface IOrganismsUserProfileHeaderBoxProps {}

const OrganismsUserProfileHeaderBox: React.FunctionComponent<IOrganismsUserProfileHeaderBoxProps> = () => {
    return (
        <div className="w-full p-6">
            <div className="relative rounded-2xl bg-gradient-to-r from-blue-200 via-gray-200 to-orange-200 p-8 shadow-sm">
                <div className="flex items-center justify-between">                    
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-2xl bg-orange-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                                <Image src="/images/user.jpg" alt="/images/user.jpg" width={100} height={100} className="w-full h-auto rounded-2xl shadow-2xl" />
                            </div> 
                        </div>
                        <div>
                            <AtomText type='sub-title-small' text='Alex Rivera'/>
                            <AtomText type='sub-content' text='6 Jul 2001 | 25 y.o'/>
                            <div className="flex gap-3 mt-3">
                                <Badge className="px-3 py-1 bg-blue-100 text-blue-600">Organizer</Badge>
                                <Badge className="px-3 py-1 bg-orange-100 text-orange-500 font-medium">Supporter</Badge>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <Button><FontAwesomeIcon icon={faPenToSquare}/>Edit Profile</Button>
                        <Button variant="destructive"><FontAwesomeIcon icon={faSignOut}/></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrganismsUserProfileHeaderBox;
