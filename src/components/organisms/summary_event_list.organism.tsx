import * as React from 'react'
import MoleculeIdentityBox from '../molecules/identity_box.molecule';
import { faCalendar, faCoins, faMoneyCheck, faPercentage, faStar, faTicket, faUsers } from '@fortawesome/free-solid-svg-icons';

interface IOrganismSummaryEventListProps {
    isFull: boolean
}

const OrganismSummaryEventList: React.FunctionComponent<IOrganismSummaryEventListProps> = ({ isFull = true }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className='bg-blue-100 p-5 pb-3 rounded-2xl'>
                <MoleculeIdentityBox icon={faCalendar} label='Upcoming Event' value='Tomorrow' />
            </div>
            <div className='bg-orange-100 p-5 pb-3 rounded-2xl'>
                <MoleculeIdentityBox icon={faUsers} label='Lifetime Attendee' value='300' color='orange' />
            </div>
            <div className='bg-green-100 p-5 pb-3 rounded-2xl'>
                <MoleculeIdentityBox icon={faMoneyCheck} label='Transaction' value='450' color='green' />
            </div>
            {
                isFull && (
                    <>
                        <div className='bg-blue-100 p-5 pb-3 rounded-2xl'>
                            <MoleculeIdentityBox icon={faCoins} label='Revenue' value={'Rp. 400,000'} />
                        </div>
                        <div className='bg-orange-100 p-5 pb-3 rounded-2xl'>
                            <MoleculeIdentityBox icon={faPercentage} label='Revenue (After Discount Cut)' value={'Rp. 300,000'} color='orange' />
                        </div>
                    </>
                )
            }
            <div className='bg-green-100 p-5 pb-3 rounded-2xl'>
                <MoleculeIdentityBox icon={faStar} label='Average Rate' value={'4.5'} color='green' />
            </div>
        </div>
    )
}

export default OrganismSummaryEventList;
