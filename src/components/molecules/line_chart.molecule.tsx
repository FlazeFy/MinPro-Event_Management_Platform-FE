'use client'
import * as React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js'
import { Line } from 'react-chartjs-2'

interface IMoleculeLineChartProps {
    labels: string[]
    datasets: {
        label: string
        data: number[]
        borderColor?: string
        backgroundColor?: string
    }[]
    title?: string
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const MoleculeLineChart: React.FunctionComponent<IMoleculeLineChartProps> = ({ labels, datasets, title }) => {

    // Declaration
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

    return <Line data={data} options={options} />
}

export default MoleculeLineChart
