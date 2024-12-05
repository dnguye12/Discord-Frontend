/* eslint-disable no-unused-vars */
import { useAuth } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { getAllServersByProfile, getServerById } from "../../services/server"

import ModalCreateServer from "./components/ModalCreateServer"
import NavigationSidebar from "./components/NavigationSidebar"
import ServerSidebar from "./components/ServerSidebar"
import ModalInvite from "./components/ModalInvite"
import ModalEditServer from "./components/ModalEditServer"
import ModalMembers from "./components/ModalMembers"
import ModalCreateChannel from "./components/ModalCreateChannel"
import ModalLeaveServer from "./components/ModalLeaveServer"
import ModalDeleteServer from "./components/ModalDeleteServer"

const ServerPage = () => {
    const serverId = useParams().serverId

    const { userId } = useAuth()
    const [checkedUser, setCheckedUser] = useState(false)
    const navigate = useNavigate()

    const [server, setServer] = useState(null)
    const [servers, setServers] = useState([])

    const [type, setType] = useState("TEXT")

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
        if (serverId) {
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
        }
    }, [serverId])

    useEffect(() => {
        if(server && !checkedUser) {
            const checkUser = async() => {
                const helper = server.members.find((member) => member.profile === userId)

                if(!helper) {
                    setServer(null)
                    navigate('/servers')
                }else {
                    setCheckedUser(true)
                }
            }

            checkUser()
        }
    }, [server, checkedUser, userId])

    const addServer = (newServer) => {
        if (servers && servers.length > 0) {
            setServers((prev) => [...prev, newServer])
        } else {
            setServers([newServer])
        }
    }

    const removeServer = (server) => {
        if (servers?.length > 0) {
            setServers((prev) => prev.filter((p) => p.id !== server.id));
        }
    }

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar server={server} servers={servers} />
            </div>
            <div className="hidden md:flex md:ml-[72px] fixed h-full w-60 z-20 flex-col inset-y-0 shadow">
                <ServerSidebar userId={userId} server={server } setType={setType}/>
            </div>
            <main className="md:pl-[312px] h-full">
                Server ID Page
            </main>
            <ModalCreateServer addServer={addServer} />
            {
                server && (
                    <>
                        <ModalInvite server={server} userId={userId} />
                        <ModalEditServer server={server} setServer={setServer} userId={userId} />
                        <ModalMembers server={server} />
                        <ModalCreateChannel server={server} setServer={setServer} type={type} setType={setType} userId={userId}/>
                        <ModalLeaveServer removeServer={removeServer} server={server} setServer={setServer} userId={userId}/>
                        <ModalDeleteServer removeServer={removeServer} server={server} setServer={setServer} userId={userId}/>
                    </>
                )
            }
        </div>
    )
}

export default ServerPage