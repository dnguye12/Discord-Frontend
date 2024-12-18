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

    const navigate = useNavigate()

    const { userId } = useAuth()
    const [checkedUser, setCheckedUser] = useState(false)

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
                const request = await getAllServersByProfile(userId) //Get all the servers that the current user is in
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
                    const response = await getServerById(serverId) //If the user is viewing a server, load it

                    if (response) {
                        setServer(response) 
                        setAlreadyFetchMembers(false);
                        setAlreadyFetchChannels(false);
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
                    navigate('/servers') //If user try to join a server they are not a part of, click them
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
                    const response = await getChannelsByServerId(server.id) //If a server is loaded, load its channels
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

    //Edge cases checking
    useEffect(() => {
        if (urlParts?.length === 2 && urlParts[1] === 'servers') {
            if(servers?.length > 0) {
                setViewingChannel(servers[0])
                navigate(`/servers/${servers[0].id}`)
            }
        } else if (urlParts?.length === 3 && urlParts[2] !== "@me" && channels) {
            const helper = channels.find((c) => c.name === "general")
            setViewingChannel(helper)
            if (helper) {
                navigate(`/servers/${serverId}/channels/${helper.id}`)
            }
        } else if (urlParts?.length === 5 && urlParts[3] === "channels") {
            if(!urlParts[2] || urlParts[2] === 'undefined') {
                navigate(`/servers`)
            }
            const helper = channels.find((c) => c.id === urlParts[4])
            setViewingChannel(helper)
            if (helper) {
                setViewingChannel(helper)
            } else {
                const helper2 = channels.find((c) => c.name === "general")
                if (helper2) {
                    navigate(`/servers/${serverId}/channels/${helper2.id}`)
                }
            }
        }
    }, [channels, urlParts, serverId, navigate])

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
                            <ChannelPage
                                channel={viewingChannel}
                                setChannel={setViewingChannel}
                                server={server}
                                servers={servers}
                                channels={channels}
                                members={members}
                                setCurrentChannel={setCurrentChannel}
                                userId={userId}
                                setType={setType}
                                viewingChannel={viewingChannel}
                                setViewingChannel={setViewingChannel}
                            />
                        )
                        : (
                            <div></div>
                        )
                }

            </main>
            <ModalCreateServer addServer={addServer} />
            {
                server && (
                    <>
                    {/*Loading modals*/}
                        <ModalInvite server={server} userId={userId} />
                        <ModalEditServer server={server} setServer={setServer} userId={userId} />
                        <ModalMembers server={server} />
                        <ModalCreateChannel server={server} setChannels={setChannels} setServer={setServer} type={type} setType={setType} userId={userId} />
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