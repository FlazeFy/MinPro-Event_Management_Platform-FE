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
    const data = {
        labels,
        datasets: datasets.map((dataset) => ({
            ...dataset,
            borderWidth: 1,
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
