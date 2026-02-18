import * as React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import MoleculeTransactionBox from '../molecules/transaction_molecule'
import { UserShortInfo } from '@/repositories/template'

interface IOrganismCustomerTransactionProps {
    customer: UserShortInfo
}

const OrganismCustomerTransaction: React.FunctionComponent<IOrganismCustomerTransactionProps> = ({ customer }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button><FontAwesomeIcon icon={faRotateLeft}/></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{customer.username}'s Transaction</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3 max-h-[75vh] overflow-y-auto pr-2">
                    <MoleculeTransactionBox title={"Event A"} desc={`Booked at 20 Jan 26`} withPoint={false}/>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default OrganismCustomerTransaction
