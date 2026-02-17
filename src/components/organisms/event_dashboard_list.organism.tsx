import * as React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPieChart, faUsers } from '@fortawesome/free-solid-svg-icons'
import MoleculePieChart from '../molecules/pie_chart.molecule'
import AtomText from '../atoms/text.atom'

interface IOrganismDashboardListProps {}

const OrganismDashboardList: React.FunctionComponent<IOrganismDashboardListProps> = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button><FontAwesomeIcon icon={faPieChart}/></Button>
            </DialogTrigger>
            <DialogContent className='min-w-[860px]'>
                <DialogHeader>
                    <DialogTitle>Event Dashboard</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[75vh] overflow-y-auto text-center">
                    <div className='pb-5'>
                        <AtomText type='content-title' text='Attendee Age Generation Comparison'/>
                        <MoleculePieChart
                            labels={['Gen Z (18-26)', 'Millennials (27-42)', 'Gen X (43-58)', 'Boomers (59+)']}
                            datasets={[
                                {
                                    label: 'Attendees',
                                    data: [220, 340, 150, 60],
                                    backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
                                },
                            ]}/>
                    </div>
                    <div className='pb-5'>
                        <AtomText type='content-title' text='Booking Time Comparison'/>
                        <MoleculePieChart
                            labels={['Morning', 'Afternoon', 'Evening', 'Night']}
                            datasets={[
                                {
                                    label: 'Bookings',
                                    data: [120, 250, 300, 150],
                                    backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
                                },
                            ]}/>
                    </div>
                    <div className='pb-5'>
                        <AtomText type='content-title' text='Transaction Discount Comparison'/>
                        <MoleculePieChart
                            labels={['Used Discount', 'No Discount']}
                            datasets={[
                                {
                                    label: 'Bookings',
                                    data: [180, 420],
                                    backgroundColor: ['#3B82F6', '#10B981'],
                                },
                            ]}/>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default OrganismDashboardList
