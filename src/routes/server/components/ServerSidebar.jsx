/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { getChannelsByServerId } from "../../../services/channel"
import { getMembersByServerId } from "../../../services/member"
import ServerHeader from "./ServerHeader"

const ServerSidebar = ({ userId, server }) => {
    const [channels, setChannels] = useState([])
    const [members, setMembers] = useState([])

    useEffect(() => {
        if (server) {
            const fetchChannels = async () => {
                try {
                    const response = await getChannelsByServerId(server.id)
                    setChannels(response)
                } catch (error) {
                    console.error("Error fetching channels:", error);
                }
            }

            fetchChannels()
        }
    }, [server])

    useEffect(() => {
        if (server) {
            const fetchMembers = async () => {
                try {
                    const response = await getMembersByServerId(server.id)
                    setMembers(response)
                } catch (error) {
                    console.error("Error fetching channels:", error);
                }
            }

            fetchMembers()
        }
    }, [server, userId])

    const textChannels = channels.filter((channel) => channel.type === "TEXT")
    const audioChannels = channels.filter((channel) => channel.type === "AUDIO")
    const videoChannels = channels.filter((channel) => channel.type === "VIDEO")

    const role = members.find((member) => member.profile === userId)?.role

    if (!server) {
        return (
            <div className="flex flex-col h-full w-full bg-bg2">
                <p>No servers to display</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full w-full bg-bg2">
            <ServerHeader server={server} role={role} />
        </div>
    )
}

export default ServerSidebar