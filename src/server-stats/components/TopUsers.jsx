/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Title
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getTopUsers } from "../../services/server-stats";
import { createConversation, findConversationWithMembers } from "../../services/conversation";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title);
const TopUsers = ({ serverId, userId }) => {
    const navigate = useNavigate()
    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        const fetchTopUsers = async () => {
            try {
                const res = await getTopUsers(serverId)

                setChartData({
                    labels: res.map(user => user.name),
                    datasets: [{
                        label: 'Number of Messages',
                        data: res.map(user => user.messageCount),
                        backgroundColor: '#5865F2',
                        borderColor: 'rgb(227, 229, 232)',
                        borderWidth: 0
                    }],
                    userIds: res.map(user => user._id)
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchTopUsers()
    }, [serverId])

    const handleClick = async (event, elements) => {
        if (elements.length > 0) {
            const index = elements[0].index;
            const helperId = chartData.userIds[index];
            if (userId === helperId) {
                return;
            }
            const request = await findConversationWithMembers(helperId)
            if (request?.length > 0) {
                navigate(`/conversations/${request[0].id}`)
            } else {
                const newConvo = await createConversation(userId, helperId)
                navigate(`/conversations/${newConvo.id}`)
            }
        }
    };

    if (!chartData) return <p>Loading chart...</p>;
    return (
        <div className="my-4">
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    onClick: handleClick,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Top Users with Most Messages',
                            color: 'white',
                            font: {
                                size: 20
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: context => `Messages: ${context.raw}`
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: 'white',
                                font: {
                                    size: 12
                                }
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.2)'
                            }
                        },
                        y: {
                            ticks: {
                                color: 'white',
                                font: {
                                    size: 12
                                }
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.2)'
                            }
                        }
                    }
                }}
            />
        </div>
    );
}

export default TopUsers;