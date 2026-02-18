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
    const defaultColors = ['#3B82F6', '#F97316', '#10B981', '#EF4444', '#9333EA', '#F59E0B', '#EF4444', '#16A34A']

    const data = {
        labels,
        datasets: datasets.map((dataset, index) => ({
            ...dataset,
            borderColor: dataset.borderColor ?? defaultColors[index % defaultColors.length],
            backgroundColor: dataset.backgroundColor ?? defaultColors[index % defaultColors.length],
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
