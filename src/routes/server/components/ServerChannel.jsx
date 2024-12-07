/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const ServerChannel = ({ channel, server, setCurrentChannel, viewingChannel, setViewingChannel, role }) => {
    const navigate = useNavigate()

    const iconMap = {
        "TEXT": <FontAwesomeIcon className="flex-shrink-0 hover:group-text-black dark:group-hover:text-white transition" icon="fa-solid fa-hashtag" />,
        "AUDIO": <FontAwesomeIcon className="flex-shrink-0 hover:group-text-black dark:group-hover:text-white transition" icon="fa-solid fa-microphone" />,
        "VIDEO": <FontAwesomeIcon className="flex-shrink-0 hover:group-text-black dark:group-hover:text-white transition" icon="fa-solid fa-video" />
    }

    const onClick = () => {
        setViewingChannel(channel)
        navigate(`/servers/${server.id}/channels/${channel.id}`)
    }

    const onClickEdit = async (channel) => {
        await setCurrentChannel(channel)
        document.getElementById('edit_channel_modal').showModal()
    }

    const onClickDelete = async (channel) => {
        await setCurrentChannel(channel)
        document.getElementById('delete_channel_modal').showModal()
    }

    if(!viewingChannel) {
        return <div>...Loading</div>
    }

    return (
        <button onClick={onClick} className={`group px-2 py-2 rounded-md flex items-center gap-x-2 w-full transition mb-1 hover:bg-bg0 ${viewingChannel.id === channel.id && "bg-bg0"}`}>
            {iconMap[channel.type]}
            <p className={`line-clamp-1 font-semibold text-sm hover:group-text-black dark:group-hover:text-white transition ${viewingChannel.id === channel.id && "font-bold text-black dark:text-white group-hover:text-black dark:group-hover:text-white"}`}>
                {channel.name}
            </p>
            {channel.name !== "general" && role !== "GUEST" && (
                <div className="ml-auto flex items-center gap-x-2">
                    <div onClick={(e) => { e.stopPropagation(); onClickEdit(channel) }} className="tooltip hidden group-hover:block" data-tip="Edit">
                        <FontAwesomeIcon className="" icon="fa-solid fa-pen" />
                    </div>
                    <div onClick={(e) => { e.stopPropagation(); onClickDelete(channel) }} className="tooltip hidden group-hover:block" data-tip="Delete">
                        <FontAwesomeIcon className="" icon="fa-solid fa-trash-can" />
                    </div>
                </div>
            )}
            {
                channel.name === "general" && (
                    <FontAwesomeIcon className="ml-auto" icon="fa-solid fa-lock" />
                )
            }
        </button>
    )
}

export default ServerChannel