import * as React from 'react'
import MoleculeLineChart from '../molecules/line_chart.molecule';
import AtomText from '../atoms/text.atom';

interface IOrganismsPeriodicGrowthBoxProps {
    
}

const OrganismsPeriodicGrowthBox: React.FunctionComponent<IOrganismsPeriodicGrowthBoxProps> = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="col-span-1 md:col-span-3 p-5 rounded-2xl shadow-lg">
                <AtomText text='Revenue Monthly' type='content-title'/>
                <MoleculeLineChart
                    labels={['Jan','Feb','Mar','Apr','May']}
                    datasets={[
                        {
                            label: 'Concert',
                            data: [2, 3, 4, 3, 5],
                            borderColor: '#3B82F6',
                            backgroundColor: '#3B82F6',
                        },
                        {
                            label: 'Seminar',
                            data: [3, 2, 3, 4, 4],
                            borderColor: '#F97316',
                            backgroundColor: '#F97316',
                        },
                    ]}
                />
            </div>
            <div className="col-span-1 md:col-span-3 p-5 rounded-2xl shadow-lg">
                <AtomText text='Total Attendee' type='content-title'/>
                <MoleculeLineChart
                    labels={['Jan','Feb','Mar','Apr','May']}
                    datasets={[
                        {
                            label: 'Concert',
                            data: [2, 3, 4, 3, 5],
                            borderColor: '#3B82F6',
                            backgroundColor: '#3B82F6',
                        },
                        {
                            label: 'Seminar',
                            data: [3, 2, 3, 4, 4],
                            borderColor: '#F97316',
                            backgroundColor: '#F97316',
                        },
                    ]}
                />
            </div>
        </div>
    )
}

export default OrganismsPeriodicGrowthBox;
