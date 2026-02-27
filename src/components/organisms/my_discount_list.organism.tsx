import * as React from 'react'
import AtomText from '../atoms/text.atom'
import MoleculeDiscountBox from '../molecules/discount_box.molecule';
import OrganismAddDiscountForm from './add_discount_form.organism';
import OrganismEditDiscountForm from './edit_discount_form.organism';

interface IOrganismMyDiscountListProps {
    role: string
}

const OrganismMyDiscountList: React.FunctionComponent<IOrganismMyDiscountListProps> = ({ role }) => {
    return (
        <div className="box-bordered mb-5">
            <div className='flex flex-wrap gap-2 justify-between'>
                <AtomText type='sub-title-small' text='My Discount Coupon'/>
                { role === "event_organizer" && <OrganismAddDiscountForm/> }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                {
                    role === "customer" ? 
                        <MoleculeDiscountBox description={'Lorem ipsum'} percentage={10} expiredAt={'10 Jun 2026'} role={role}/>
                    :
                        <OrganismEditDiscountForm percentage={10} description={'Lorem ipsum'} role={role}/>
                }
            </div>
        </div>
    )
}

export default OrganismMyDiscountList;
