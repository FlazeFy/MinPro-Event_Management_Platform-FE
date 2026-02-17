'use client'
import React, { useEffect, useState } from 'react'
import MoleculeLineChart from '../molecules/line_chart.molecule';
import AtomText from '../atoms/text.atom';
import { getPeriodicRevenue, LineChartResponse } from '@/repositories/r_stats';
import Skeleton from 'react-loading-skeleton';

interface IOrganismPeriodicGrowthBoxProps {
    
}

const OrganismPeriodicGrowthBox: React.FunctionComponent<IOrganismPeriodicGrowthBoxProps> = () => {
    const [itemRevenue, setItemRevenue] = useState<LineChartResponse>()
    const [loadingRevenue, setLoadingRevenue] = useState(true)
    const [errorRevenue, setErrorRevenue] = useState<string | null>(null)

    useEffect(() => {
        const fetchPeriodicRevenue = async () => {
            try {
                const data = await getPeriodicRevenue()
                setItemRevenue(data)
            } catch (err: any) {
                setErrorRevenue(err?.response?.data?.message || "Something went wrong")
            } finally { 
                setLoadingRevenue(false)
            }
        }

        fetchPeriodicRevenue()
    }, [])

    return (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="col-span-1 md:col-span-3 box-bordered">
                <AtomText text='Revenue Monthly' type='content-title'/>
                { loadingRevenue && <Skeleton className="h-[200px] w-full rounded-xl"/> }
                { !loadingRevenue && itemRevenue && <MoleculeLineChart labels={itemRevenue?.labels} datasets={itemRevenue.datasets}/> }
            </div>
            <div className="col-span-1 md:col-span-3 box-bordered">
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

export default OrganismPeriodicGrowthBox;
