/* eslint-disable react/prop-types */

import ServerHeader from "./ServerHeader"
import ServerSearch from "./ServerSearch"
import ServerSection from "./ServerSection";
import ServerChannel from "./ServerChannel"
import ServerMember from "./ServerMember"

const ServerSidebar = ({ channels, members, setCurrentChannel, viewingChannel, setViewingChannel, userId, server, setType }) => {

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
            <div className="flex flex-col h-full w-full bg-bg2 p-3">
                <p>Select a server.</p>
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
                                        icon: iconMap[channel.type],
                                        helper: channel.id
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
                                        icon: iconMap[channel.type],
                                        helper: channel.id
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
                                        icon: iconMap[channel.type],
                                        helper: channel.id
                                    }))
                                    : []
                            }, {
                                heading: "Members",
                                id: "Members",
                                items: members?.map((member) => ({
                                    id: member.profile.id,
                                    type: "member",
                                    children: member.profile.name ||member.profile.email,
                                    icon: roleIconMap[member.role]
                                }))

                            }
                        ]} server={server} userId={userId}/>
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
                                        setCurrentChannel={setCurrentChannel}
                                        viewingChannel={viewingChannel}
                                        setViewingChannel={setViewingChannel}
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
                                        setCurrentChannel={setCurrentChannel}
                                        viewingChannel={viewingChannel}
                                        setViewingChannel={setViewingChannel}
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
                                        setCurrentChannel={setCurrentChannel}
                                        viewingChannel={viewingChannel}
                                        setViewingChannel={setViewingChannel}
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
                                        userId={userId}
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