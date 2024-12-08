import { useAuth } from "@clerk/clerk-react"
import { useEffect, useState } from "react"

import NavigationSidebar from "../server/components/NavigationSidebar"
import ConversationSidebar from "./components/ConversationSidebar"
import ModalCreateServer from "../server/components/ModalCreateServer"

import { getAllServersByProfile } from "../../services/server"
import { findConversationWithMembers, getConversation } from "../../services/conversation"
import ConversationMain from "./components/ConversationMain"


const ConversationPage = () => {
    const urlParts = window.location.pathname.split('/')
    const { userId } = useAuth()

    const [servers, setServers] = useState([])

    const [conversations, setConversations] = useState([])
    const [alreadyFetchConversations, setAlreadyFetchConversations] = useState(false)

    const [currentConversation, setCurrentConversation] = useState(null)
    const [alreadyFetchCurrentConversation, setAlreadyFetchCurrentConversation] = useState(false)

    useEffect(() => {
        if (!alreadyFetchCurrentConversation && urlParts?.length >= 3 && urlParts[1] === "conversations") {
            const fetchCurrentConversation = async () => {
                try {
                    const request = await getConversation(urlParts[2])
                    setCurrentConversation(request)
                    setAlreadyFetchCurrentConversation(true)
                } catch (error) {
                    console.log(error)
                    setAlreadyFetchCurrentConversation(true)
                }
            }
            fetchCurrentConversation()
        }
    }, [alreadyFetchCurrentConversation, urlParts, userId])

    useEffect(() => {
        if (userId && !alreadyFetchConversations) {
            const fetchConversations = async () => {
                try {
                    const request = await findConversationWithMembers(userId)
                    setConversations(request)
                    setAlreadyFetchConversations(true)
                } catch (error) {
                    setAlreadyFetchConversations(true)
                    console.log(error)
                }
            }

            fetchConversations()
        }
    }, [alreadyFetchConversations, userId])

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

    const addServer = (newServer) => {
        if (servers && servers.length > 0) {
            setServers((prev) => [...prev, newServer])
        } else {
            setServers([newServer])
        }
    }

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar servers={servers} />
            </div>
            <div className="hidden md:flex md:ml-[72px] fixed h-full w-60 z-20 flex-col inset-y-0 shadow">
                <ConversationSidebar conversations={conversations} userId={userId} currentConversation={currentConversation} setCurrentConversation={setCurrentConversation} />
            </div>
            <main className="md:pl-[312px] h-full">
                {
                    currentConversation
                        ?
                        <ConversationMain conversations={conversations} currentConversation={currentConversation} setCurrentConversation={setCurrentConversation} servers={servers} userId={userId}/>
                        :
                        <div className="bg-bg1 h-full min-h-screen"></div>
                }

            </main>
            <ModalCreateServer addServer={addServer} />
        </div>
    )
}

export default ConversationPage