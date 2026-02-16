'use client'
import * as React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { DatasetTemplate } from '@/repositories/template'

interface IMoleculeLineChartProps {
    labels: string[]
    datasets: DatasetTemplate[]
    title?: string
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const MoleculeLineChart: React.FunctionComponent<IMoleculeLineChartProps> = ({ labels, datasets, title }) => {
    const data = {
        labels,
        datasets: datasets.map((dataset) => ({
            ...dataset,
            tension: 0.4,
            fill: false,
            borderWidth: 2,
            pointRadius: 4,
        })),
    }

    const options: ChartOptions<'line'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: !!title,
                text: title,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    }

    return <Line data={data} options={options}/>
}

export default MoleculeLineChart
