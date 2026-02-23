'use client'
import React, { useEffect, useState } from 'react'
import MoleculeLineChart from '../molecules/line_chart.molecule';
import AtomText from '../atoms/text.atom';
import { getPeriodicAttendee, getPeriodicRevenue, LineChartResponse } from '@/repositories/r_stats';
import Skeleton from 'react-loading-skeleton';

interface IOrganismPeriodicGrowthBoxProps {}

const OrganismPeriodicGrowthBox: React.FunctionComponent<IOrganismPeriodicGrowthBoxProps> = () => {
    // For repo fetching
    const [itemRevenue, setItemRevenue] = useState<LineChartResponse>()
    const [loadingRevenue, setLoadingRevenue] = useState(true)
    const [errorRevenue, setErrorRevenue] = useState<string | null>(null)
    const [itemAttendee, setItemAttendee] = useState<LineChartResponse>()
    const [loadingAttendee, setLoadingAttendee] = useState(true)
    const [errorAttendee, setErrorAttendee] = useState<string | null>(null)

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
        const fetchPeriodicAttendee = async () => {
            try {
                const data = await getPeriodicAttendee()
                setItemAttendee(data)
            } catch (err: any) {
                setErrorAttendee(err?.response?.data?.message || "Something went wrong")
            } finally { 
                setLoadingAttendee(false)
            }
        }

        fetchPeriodicRevenue()
        fetchPeriodicAttendee()
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
                { loadingAttendee && <Skeleton className="h-[200px] w-full rounded-xl"/> }
                { !loadingAttendee && itemAttendee && <MoleculeLineChart labels={itemAttendee?.labels} datasets={itemAttendee.datasets}/> }
            </div>
        </div>
    )
}

export default OrganismPeriodicGrowthBox;
