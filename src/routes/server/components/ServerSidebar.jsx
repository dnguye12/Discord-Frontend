/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

import { getChannelsByServerId } from "../../../services/channel"
import { getMembersByServerId } from "../../../services/member"

import ServerHeader from "./ServerHeader"
import ServerSearch from "./ServerSearch"
import ServerSection from "./ServerSection";
import ServerChannel from "./ServerChannel"
import ServerMember from "./ServerMember"

const ServerSidebar = ({ userId, server, setType }) => {
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

    const iconMap = {
        "TEXT": "HashtagIcon",
        "AUDIO": "MicrophoneIcon",
        "VIDEO": "VideoCameraIcon"
    }

    const roleIconMap = {
        "GUEST": "",
        "MODERATOR": "ShieldCheckIcon",
        "ADMIN": "ShieldCheckIcon"
    }

    const textChannels = channels.filter((channel) => channel.type === "TEXT")
    const audioChannels = channels.filter((channel) => channel.type === "AUDIO")
    const videoChannels = channels.filter((channel) => channel.type === "VIDEO")

    const role = members.find((member) => member.profile?.id === userId)?.role

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

            <div className="flex-1 px-4">
                <div className="mt-2">
                    {channels?.length > 0 &&
                        <ServerSearch data={[
                            {
                                heading: "Text Channels",
                                id: "Text Channels",
                                items: textChannels
                                    ? textChannels.map((channel) => ({
                                        id: channel.name,
                                        type: "channel",
                                        children: channel.name,
                                        icon: iconMap[channel.type]
                                    }))
                                    : []
                            },
                            {
                                heading: "Audio Channels",
                                id: "Audio Channels",
                                items: audioChannels
                                    ? audioChannels.map((channel) => ({
                                        id: channel.name,
                                        type: "channel",
                                        children: channel.name,
                                        icon: iconMap[channel.type]
                                    }))
                                    : []
                            },
                            {
                                heading: "Video Channels",
                                id: "Video Channels",
                                items: videoChannels
                                    ? videoChannels.map((channel) => ({
                                        id: channel.name,
                                        type: "channel",
                                        children: channel.name,
                                        icon: iconMap[channel.type]
                                    }))
                                    : []
                            }, {
                                heading: "Members",
                                id: "Members",
                                items: members?.map((member) => ({
                                    id: member.id,
                                    type: "member",
                                    children: member.profile.name,
                                    icon: roleIconMap[member.role]
                                }))

                            }
                        ]} />
                    }
                </div>
                <div className="divider my-0"></div>
                {
                    !!textChannels?.length && (
                        <div className="mb-2">
                            <ServerSection
                                sectionType="channels"
                                channelType="TEXT"
                                role={role}
                                label="Text Channels"
                                setType={setType}
                            />
                            <div className="space-y-0.5">
                                {textChannels.map((channel) => (
                                    <ServerChannel
                                        key={channel.id}
                                        channel={channel}
                                        role={role}
                                        server={server}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                }
                {
                    !!audioChannels?.length && (
                        <div className="mb-2">
                            <ServerSection
                                sectionType="channels"
                                channelType="AUDIO"
                                role={role}
                                label="Audio Channels"
                                setType={setType}
                            />
                            <div className="space-y-0.5">
                                {audioChannels.map((channel) => (
                                    <ServerChannel
                                        key={channel.id}
                                        channel={channel}
                                        role={role}
                                        server={server}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                }
                {
                    !!videoChannels?.length && (
                        <div className="mb-2">
                            <ServerSection
                                sectionType="channels"
                                channelType="VIDEO"
                                role={role}
                                label="Video Channels"
                                setType={setType}
                            />
                            <div className="space-y-0.5">
                                {videoChannels.map((channel) => (
                                    <ServerChannel
                                        key={channel.id}
                                        channel={channel}
                                        role={role}
                                        server={server}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                }
                {
                    !!members?.length && (
                        <div className="mb-2">
                            <ServerSection
                                sectionType="members"
                                role={role}
                                label="Members"
                                server={server}
                            />
                            <div className="space-y-0.5">
                                {members.map((member) => (
                                    <ServerMember
                                        key={member.id}
                                        member={member}
                                        server={server}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ServerSidebar