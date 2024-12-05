/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";

const ServerChannel = ({ channel, server, role }) => {
    const channelId = useParams().channelId
    const iconMap = {
        "TEXT": <FontAwesomeIcon className="flex-shrink-0 hover:group-text-black dark:group-hover:text-white transition" icon="fa-solid fa-hashtag" />,
        "AUDIO": <FontAwesomeIcon className="flex-shrink-0 hover:group-text-black dark:group-hover:text-white transition" icon="fa-solid fa-microphone" />,
        "VIDEO": <FontAwesomeIcon className="flex-shrink-0 hover:group-text-black dark:group-hover:text-white transition" icon="fa-solid fa-video" />
    }

    return (
        <button className={`group px-2 py-2 rounded-md flex items-center gap-x-2 w-full transition mb-1 hover:bg-bg0 ${channelId === channel.id && "bg-bg0"}`}>
            {iconMap[channel.type]}
            <p className={`line-clamp-1 font-semibold text-sm hover:group-text-black dark:group-hover:text-white transition ${channelId === channel.id && "text-primary group-hover:text-black dark:group-hover:text-white"}`}>
                {channel.name}
            </p>
            {channel.name !== "general" && role !== "GUEST" && (
                <div className="ml-auto flex items-center gap-x-2">
                    <div className="tooltip" data-tip="Edit">
                        <FontAwesomeIcon className="hidden group-hover:block" icon="fa-solid fa-pen" />
                    </div>
                    <div className="tooltip" data-tip="Delete">
                        <FontAwesomeIcon className="hidden group-hover:block" icon="fa-solid fa-trash-can" />
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