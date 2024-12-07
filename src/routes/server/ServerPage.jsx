/* eslint-disable no-unused-vars */
import { useAuth } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { getAllServersByProfile, getServerById } from "../../services/server"
import { getChannelsByServerId } from "../../services/channel"
import { getMembersByServerId } from "../../services/member"

import ModalCreateServer from "./components/ModalCreateServer"
import NavigationSidebar from "./components/NavigationSidebar"
import ServerSidebar from "./components/ServerSidebar"
import ModalInvite from "./components/ModalInvite"
import ModalEditServer from "./components/ModalEditServer"
import ModalMembers from "./components/ModalMembers"
import ModalCreateChannel from "./components/ModalCreateChannel"
import ModalLeaveServer from "./components/ModalLeaveServer"
import ModalDeleteServer from "./components/ModalDeleteServer"
import ModalDeleteChannel from "./components/ModalDeleteChannel"
import ModalEditChannel from "./components/ModalEditChannel"
import ChannelPage from "./components/channel/ChannelPage"

const ServerPage = () => {
    const serverId = useParams().serverId
    const urlParts = window.location.pathname.split('/')

    const { userId } = useAuth()
    const [checkedUser, setCheckedUser] = useState(false)
    const navigate = useNavigate()

    const [server, setServer] = useState(null)
    const [servers, setServers] = useState([])

    const [currentChannel, setCurrentChannel] = useState(null) //Channel that is being edited, deleted: too lazy to change to better name :(())
    const [viewingChannel, setViewingChannel] = useState(null) //Channel the user is viewing

    const [channels, setChannels] = useState([])
    const [alreadyFetchChannels, setAlreadyFetchChannels] = useState(false)
    const [members, setMembers] = useState([])
    const [alreadyFetchMembers, setAlreadyFetchMembers] = useState(false)

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
        if (server && !checkedUser) {
            const checkUser = async () => {
                const helper = server.members.find((member) => member.profile === userId)

                if (!helper) {
                    setServer(null)
                    navigate('/servers')
                } else {
                    setCheckedUser(true)
                }
            }

            checkUser()
        }
    }, [server, checkedUser, userId])

    useEffect(() => {
        if (server && !alreadyFetchChannels) {
            const fetchChannels = async () => {
                try {
                    const response = await getChannelsByServerId(server.id)
                    setChannels(response)
                    setAlreadyFetchChannels(true)
                } catch (error) {
                    console.error("Error fetching channels:", error);
                }
            }

            fetchChannels()
        }
    }, [server, channels, alreadyFetchChannels])

    useEffect(() => {
        if (server && !alreadyFetchMembers) {
            const fetchMembers = async () => {
                try {
                    const response = await getMembersByServerId(server.id)
                    setMembers(response)
                    setAlreadyFetchMembers(true)
                } catch (error) {
                    console.error("Error fetching channels:", error);
                }
            }

            fetchMembers()
        }
    }, [server, userId, alreadyFetchMembers])

    useEffect(() => {
        if(urlParts?.length === 3 && channels) {
            setViewingChannel(channels.find((c) => c.name === "general"))
        }
    }, [channels])

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
                <ServerSidebar channels={channels} members={members} setCurrentChannel={setCurrentChannel} userId={userId} server={server} setType={setType} viewingChannel={viewingChannel} setViewingChannel={setViewingChannel} />
            </div>
            <main className="md:pl-[312px] h-full">
                {
                    viewingChannel
                    ? (
                        <ChannelPage channel={viewingChannel} setChannel={setViewingChannel}/>
                    )
                    : (
                        <div>Server ID Page</div>
                    )
                }
                
            </main>
            <ModalCreateServer addServer={addServer} />
            {
                server && (
                    <>
                        <ModalInvite server={server} userId={userId} />
                        <ModalEditServer server={server} setServer={setServer} userId={userId} />
                        <ModalMembers server={server} />
                        <ModalCreateChannel server={server} setServer={setServer} type={type} setType={setType} userId={userId} />
                        <ModalLeaveServer removeServer={removeServer} server={server} setServer={setServer} userId={userId} />
                        <ModalDeleteServer removeServer={removeServer} server={server} setServer={setServer} userId={userId} />
                        <ModalDeleteChannel currentChannel={currentChannel} setCurrentChannel={setCurrentChannel} setChannels={setChannels} server={server} setServer={setServer} userId={userId} />

                    </>
                )
            }
            {
                server && currentChannel &&
                (
                    <ModalEditChannel currentChannel={currentChannel} setCurrentChannel={setCurrentChannel} server={server} setChannels={setChannels} userId={userId} />
                )
            }
        </div>
    )
}

export default ServerPage