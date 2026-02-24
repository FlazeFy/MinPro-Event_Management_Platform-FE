import * as React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, ChartOptions } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { DatasetTemplate } from '@/repositories/template'

interface IMoleculePieChartProps {
    labels: string[]
    datasets: DatasetTemplate[]
}

ChartJS.register(ArcElement, Tooltip, Legend, Title)

const MoleculePieChart: React.FunctionComponent<IMoleculePieChartProps> = ({ labels, datasets }) => {
    const defaultColors = ['#3B82F6', '#F97316', '#10B981', '#EF4444', '#9333EA', '#F59E0B', '#EF4444', '#16A34A']

    const data = {
        labels,
        datasets: datasets.map((dataset) => ({
            ...dataset,
            borderWidth: 1,
            backgroundColor: dataset.backgroundColor ?? defaultColors.slice(0, labels.length),
        })),
    }

    const options: ChartOptions<'pie'> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        },
    }

    return <Pie data={data} options={options}/>
}

export default MoleculePieChart
