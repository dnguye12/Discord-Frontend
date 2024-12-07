/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { getChannel } from "../../../../services/channel"

import ChatHeader from "./components/ChatHeader"
import NavigationSidebar from "../NavigationSidebar"
import ServerSidebar from "../ServerSidebar"

const ChannelPage = ({ channel, setChannel, server, servers, channels, members, setCurrentChannel, userId, setType, viewingChannel, setViewingChannel }) => {
    const [openSide, setOpenSide] = useState(false)
    useEffect(() => {
        if (!channel) {
            const fetchChannel = async () => {
                const urlParts = window.location.pathname.split('/')
                if (urlParts.length >= 5 && urlParts[3] === "channels") {
                    const channelId = urlParts[4]
                    try {
                        const request = await getChannel(channelId)
                        if (request) {
                            setChannel(request)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
            fetchChannel()
        }
    }, [])

    if (!channel) {
        return <div>...Loading</div>
    }
    return (
        <div className="bg-bg1 flex flex-col h-full min-h-screen drawer">
            <input id="mobile-drawer" type="checkbox" className="drawer-toggle"  />
            <div className="drawer-content">
                <ChatHeader channel={channel} setOpenSide={setOpenSide} />
            </div>
            <div className="md:hidden drawer-side">
                <label htmlFor="mobile-drawer" aria-label="close sidebar" className="drawer-overlay" onClick={() => setOpenSide(false)}></label>
                <div className={`md:hidden flex ${openSide && "h-full w-[72px] z-30 flex-col fixed inset-y-0"} `}>
                    <NavigationSidebar server={server} servers={servers} />
                </div>
                <div className={`md:hidden flex ${openSide && "ml-[72px] fixed h-full w-60 z-20 flex-col inset-y-0 shadow"} `}>
                    <ServerSidebar channels={channels} members={members} setCurrentChannel={setCurrentChannel} userId={userId} server={server} setType={setType} viewingChannel={viewingChannel} setViewingChannel={setViewingChannel} />
                </div>
            </div>
        </div>
    )
}

export default ChannelPage