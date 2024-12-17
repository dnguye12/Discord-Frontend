/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getRoleCount } from '../../services/server-stats';

ChartJS.register(ArcElement, Tooltip, Legend);

const MemberRole = ({ serverId }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchMemberRole = async () => {
            try {
                const res = await getRoleCount(serverId)

                setChartData({
                    labels: res.map(item => item.role),
                    datasets: [{
                        label: 'Number of Members',
                        data: res.map(item => item.count),
                        backgroundColor: [
                            '#ED4245', // Red
                            '#5865F2', // Blue
                            '#FEE75C'  // Yellow
                        ],
                        borderColor: '#ffffff',
                        borderWidth: 1
                    }],
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchMemberRole()
    }, [serverId])

    if (!chartData) return <p>Loading chart...</p>;
    return (
        <div className='px-64 my-4'>
            <Doughnut
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Roles distribution',
                            color: 'white',
                            font: {
                                size: 20
                            }
                        },
                        legend: {
                            position: 'right',
                            labels: {
                                color: 'white',
                                font: { size: 14 }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: context => `${context.label}: ${context.raw}`
                            }
                        }
                    }
                }}
            />
        </div>
    );
}

export default MemberRole;