import * as React from 'react'
import AtomText from '../atoms/text.atom'
import MoleculeDiscountBox from '../molecules/discount_box.molecule';

interface IOrganismMyDiscountListProps {
    role: string
}

const OrganismMyDiscountList: React.FunctionComponent<IOrganismMyDiscountListProps> = ({ role }) => {
    return (
        <div className="box-bordered mb-5">
            <AtomText type='sub-title-small' text='My Discount Coupon'/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                <MoleculeDiscountBox description={'Lorem ipsum'} percentage={10} expiredAt={'10 Jun 2026'}/>
                <MoleculeDiscountBox description={'Lorem ipsum'} percentage={10} expiredAt={'10 Jun 2026'}/>
                <MoleculeDiscountBox description={'Lorem ipsum'} percentage={10} expiredAt={'10 Jun 2026'}/>
            </div>
        </div>
    )
}

export default OrganismMyDiscountList;
