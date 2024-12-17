/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import ServerMemberStatus from "./ServerMemberStatus";
import { getMember } from "../../../services/member";
import { setProfileStatus } from "../../../services/profile";

const ServerMember = ({ member, userId }) => {
    const [helperMember, setHelperMember] = useState(member)

    useEffect(() => {
        const fetchMember = async () => {
            try {
                let helper = await getMember(member.id)
                if (helper.profile.id === userId) {
                    if (helper.profile.online === 'OFF') {
                        helper = await setProfileStatus(userId, 'ONL', Date.now())
                    } else {
                        helper = await setProfileStatus(userId, helper.profile.online, Date.now())
                    }
                } else {
                    if (!helper.profile.lastActive) {
                        helper = await setProfileStatus(helper.profile.id, 'OFF', Date.now())
                    } else {
                        const lastActive = new Date(helper.profile.lastActive);
                        const fiveMinutesAgo = Date.now() - 300000;
                        if (lastActive.getTime() < fiveMinutesAgo) {
                            helper = await setProfileStatus(helper.profile.id, 'OFF', helper.profile.lastActive)
                        }
                    }
                }
                setHelperMember(helper)
            } catch (error) {
                console.log(error)
            }
        }

        fetchMember()

        const interval = setInterval(fetchMember, 300000)

        return () => clearInterval(interval)
    }, [member, userId])

    const memberId = useParams().memberId
    const channelId = useParams().channelId
    const roleIconMap = {
        "GUEST": null,
        "MODERATOR": <FontAwesomeIcon className="text-primary" icon="fa-solid fa-shield-halved" />,
        "ADMIN": <FontAwesomeIcon className="text-red" icon="fa-solid fa-shield" />
    }

    const navigate = useNavigate()

    const onMemberClick = () => {
        if (userId === member.profile.id) {
            return;
        }
        navigate(`/conversations/${member.profile.id}`)
    }

    return (
        <button onClick={onMemberClick} className={`group px-2 py-2 rounded-md flex items-center gap-x-2 w-full transition mb-1 hover:bg-bg0 ${memberId === member.id && "bg-bg0"}`}>
            <div className="relative">
                {member.profile.imageUrl ?
                    <img src={member.profile.imageUrl} className="w-8 h-8 rounded-full shadow-lg border border-bg0" />
                    :
                    <div className="w-8 h-8 rounded-full shadow-lg border border-bg0"></div>
                }
                <ServerMemberStatus status={helperMember.online ? helperMember.online : member.profile.online} />
            </div>
            <p className={`font-semibold text-sm group-hover:text-black dark:group-hover:text-white transition ${channelId === member.id && "bg-bg0"}`}>{member.profile.name || member.profile.email}</p>
            {roleIconMap[member.role]}
        </button>
    )
}

export default ServerMember