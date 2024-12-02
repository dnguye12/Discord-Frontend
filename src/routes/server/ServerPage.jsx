/* eslint-disable no-unused-vars */
import { useAuth } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { getAllServersByProfile, getServerById } from "../../services/server"

import ModalCreateServer from "./components/ModalCreateServer"
import NavigationSidebar from "./components/NavigationSidebar"
import ServerSidebar from "./components/ServerSidebar"
import ModalInvite from "./components/ModalInvite"
import ModalEditServer from "./components/ModalEditServer"

const ServerPage = () => {
    const serverId = useParams().serverId
    const { userId } = useAuth()

    const [server, setServer] = useState(null)
    const [servers, setServers] = useState([])

    useEffect(() => {
        const fetchServers = async () => {
            try {
                const request = await getAllServersByProfile(userId)
                setServers(request)
            } catch (error) {
                console.log(error)
            }
        }

        fetchServers()
    }, [userId])

    useEffect(() => {
        const fetchServer = async () => {
            try {
                const response = await getServerById(serverId)

                if (response) {
                    setServer(response)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchServer()
    }, [serverId])

    const addServer = (newServer) => {
        if (servers.length > 0) {
            setServers((prev) => [...prev, newServer])
        } else {
            setServers([newServer])
        }
    }

    if(!server || !servers) {
        return <div>...Loading</div>
    }

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar server={server} servers={servers} />
            </div>
            <div className="hidden md:flex md:ml-[72px] fixed h-full w-60 z-20 flex-col inset-y-0 shadow">
                <ServerSidebar userId={userId} server={server}/>
            </div>
            <main className="md:pl-[312px] h-full">
                Server ID Page
            </main>
            <ModalCreateServer addServer={addServer} />
            <ModalInvite server={server} userId={userId}/>
            <ModalEditServer server={server} setServer={setServer} userId={userId}/>
        </div>
    )
}

export default ServerPage