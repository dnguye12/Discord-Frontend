
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react"
import TopUsers from "./components/TopUsers"
import MemberRole from "./components/MemberRole"
import MemberGrowth from "./components/MemberGrowth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { getServerByIdForStat } from "../services/server"
import moment from 'moment';

const ServerStats = () => {
    const navigate = useNavigate()
    const { userId } = useAuth()
    const serverId = useParams().serverId

    const [server, setServer] = useState(null)

    useEffect(() => {
        const fetchServer = async () => {
            try {
                const req = await getServerByIdForStat(serverId)
                setServer(req)
            } catch (error) {
                console.log(error)
            }
        }
        fetchServer()
    }, [serverId])

    if (!server) { return <p>Loading chart...</p>; }

    /*
    Display the server statistic if you are an admin

    With charts and texts
    */
    return (
        <div className="h-full bg-bg1">
            <main className=" flex flex-col max-w-6xl mx-auto h-full min-h-screen">
                <div className="w-full flex justify-end my-4">
                    {/* Navigation back to server */}
                    <button className="bg-white px-4 py-2 flex justify-center items-center rounded-full text-black text-sm border-none transition font-semibold hover:scale-105 hover:bg-neutral-200" onClick={() => { navigate(`/servers/${serverId}`) }}>
                        Back to server <FontAwesomeIcon className="ms-1" icon="fa-solid fa-arrow-right-to-bracket" />
                    </button>
                </div>
                <div className="rounded-md shadow-md w-full border border-bg0 p-10 my-4 flex">
                    {/* Server details */}
                    <div className="flex w-full justify-evenly">
                        <div>
                            {
                                server.imageUrl ?
                                    <img className={`relative group flex mx-3 h-24 w-24 rounded-full shadow group-hover:rounded-[16px] transition-all overflow-hidden`} src={`${import.meta.env.VITE_API_URL}/upload/files/${server.imageUrl}`} />
                                    :
                                    <div className="relative group flex mx-3 h-24 w-24 rounded-full shadow group-hover:rounded-[16px] transition-all overflow-hidden"></div>
                            }
                        </div>

                        {/*Server stats*/}
                        <div className="divider divider-horizontal"></div>
                        <div className="flex flex-col item justify-center">
                            <h1 className="font-bold text-3xl text-white mb-1">{server.name}</h1>
                            <p className="text-lg">Created on: {moment(server.createdAt).format("MMM Do YYYY")}</p>
                        </div>
                        <div className="divider divider-horizontal"></div>
                        <div className="flex flex-col item justify-center items-center">
                            <p className="text-lg"><FontAwesomeIcon className="mr-2" icon="fa-solid fa-user" />Members Count</p>
                            <h1 className="font-bold text-3xl text-white mb-1">{server.members.length}</h1>
                        </div>
                        <div className="divider divider-horizontal"></div>
                        <div className="flex flex-col item justify-center items-center">
                            <p className="text-lg"><FontAwesomeIcon className="mr-2" icon="fa-solid fa-users" />Channels Count</p>
                            <h1 className="font-bold text-3xl text-white mb-1">{server.channels.length}</h1>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <TopUsers serverId={serverId} userId={userId} />
                <div className="divider"></div>
                <MemberRole serverId={serverId} />
                <div className="divider"></div>
                <MemberGrowth serverId={serverId} />
            </main>
        </div>
    );
}

export default ServerStats;