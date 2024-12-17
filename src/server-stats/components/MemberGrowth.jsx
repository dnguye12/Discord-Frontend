/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Title,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getMemberGrowth } from "../../services/server-stats";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Title, Legend);
const MemberGrowth = ({ serverId }) => {
    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        const fetchMemberGrowth = async () => {
            try {
                const res = await getMemberGrowth(serverId)

                setChartData({
                    labels: res.map(entry => entry.date),
                    datasets: [
                        {
                            label: 'Total Members Over Time',
                            data: res.map(entry => entry.totalMembers), 
                            borderColor: '#4752C4',
                            backgroundColor: '#5865F2',
                            borderWidth: 2,
                            pointBackgroundColor: '#5865F2'
                        }
                    ]
                });
            } catch (error) {
                console.log(error)
            }
        }

        fetchMemberGrowth()
    }, [serverId])

    if (!chartData) return <p>Loading chart...</p>;
    return (
        <div className="my-4">
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Server Member Growth',
                            color: 'white',
                            font: { size: 20 }
                        },
                        legend: {
                            labels: { color: 'white' }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Date',
                                color: 'white'
                            },
                            ticks: { color: 'white' },
                            grid: { color: 'rgba(255, 255, 255, 0.2)' }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Total Members',
                                color: 'white'
                            },
                            ticks: { color: 'white' },
                            grid: { color: 'rgba(255, 255, 255, 0.2)' }
                        }
                    }
                }}
            />
        </div>
    );
}

export default MemberGrowth;