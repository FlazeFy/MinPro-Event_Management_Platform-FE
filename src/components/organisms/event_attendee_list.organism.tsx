import * as React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import MoleculeTransactionBox from '../molecules/transaction_molecule'

interface IOrganismEventAttendeeProps {}

const OrganismEventAttendee: React.FunctionComponent<IOrganismEventAttendeeProps> = () => {
    const [open, setOpen] = React.useState(false)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button><FontAwesomeIcon icon={faUsers}/></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Attendee List</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3 max-h-[75vh] overflow-y-auto pr-2">
                    <MoleculeTransactionBox title={"Jhon Doe"} desc={`Booked at 20 Jan 26`} profileImage={'/images/user.jpg'} withPoint={false}/>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default OrganismEventAttendee
