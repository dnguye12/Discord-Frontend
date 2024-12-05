/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";

const ServerMember = ({member, server}) => {
    const memberId = useParams().memberId
    const channelId = useParams().channelId
    const roleIconMap = {
        "GUEST": null,
        "MODERATOR": <FontAwesomeIcon className="text-primary" icon="fa-solid fa-shield-halved" />,
        "ADMIN": <FontAwesomeIcon className="text-red" icon="fa-solid fa-shield" />
    }


    return (
        <button className={`group px-2 py-2 rounded-md flex items-center gap-x-2 w-full transition mb-1 hover:bg-bg0 ${memberId === member.id && "bg-bg0"}`}>
            <img src={member.profile.imageUrl} className="w-8 h-8 rounded-full shadow-lg border border-bg0" />
            <p className={`font-semibold text-sm group-hover:text-black dark:group-hover:text-white transition ${channelId === member.id && "bg-bg0"}`}>{member.profile.name}</p>
            {roleIconMap[member.role]}
        </button>
    )
}

export default ServerMember