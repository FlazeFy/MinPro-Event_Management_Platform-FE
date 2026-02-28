import React, { useEffect, useState } from 'react'
import AtomText from '../atoms/text.atom'
import MoleculeDiscountBox from '../molecules/discount_box.molecule';
import OrganismAddDiscountForm from './add_discount_form.organism';
import OrganismEditDiscountForm from './edit_discount_form.organism';
import { DiscountItem, getMyDiscount } from '@/repositories/r_discount';
import MoleculeNoDataBox from '../molecules/no_data_box.molecule';
import Skeleton from 'react-loading-skeleton';

interface IOrganismMyDiscountListProps {
    role: string
}

const OrganismMyDiscountList: React.FunctionComponent<IOrganismMyDiscountListProps> = ({ role }) => {
    // For fetching
    const [items, setItems] = useState<DiscountItem[]>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    // For state management
    const [page, setPage] = useState(1)

    const fetchMyDiscount = async () => {
        setLoading(true)
        try {
            const { data, meta } = await getMyDiscount(page)
            setItems(data)
            setPage(meta.page)
        } catch (err: any) {
            if (err.response?.status === 404 && err.response?.data?.message) {
                setItems([])
                return []
            }
            
            setError(err?.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMyDiscount()
    }, [])

    return (
        <div className="box-bordered mb-5">
            <div className='flex flex-wrap gap-2 justify-between'>
                <AtomText type='sub-title-small' text='My Discount Coupon'/>
                { role === "event_organizer" && <OrganismAddDiscountForm/> }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                { error && <MoleculeNoDataBox title='Something went wrong'/> }
                { loading && <Skeleton className="h-[200px] w-full rounded-xl" /> }
                {
                    !loading && !error && items && items.length > 0 ?
                        items.map((dt, idx) => (
                            role === "customer" ?
                                <MoleculeDiscountBox key={idx} description={dt.description} percentage={dt.percentage} expiredAt={dt.expired_at} role={role}/>
                            :
                                <OrganismEditDiscountForm key={idx} percentage={dt.percentage} description={dt.description} role={role}/>
                        ))
                    :
                        <MoleculeNoDataBox title={'Discount not found'}/>
                }
            </div>
        </div>
    )
}

export default OrganismMyDiscountList;
