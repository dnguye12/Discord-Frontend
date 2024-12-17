/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import ServerMemberStatus from "../../server/components/ServerMemberStatus";
import { useEffect, useState } from "react";
import { setProfileStatus } from "../../../services/profile";

const ConversationMember = ({ c, helper, currentConversation, setCurrentConversation, userId }) => {
    const [helperMember, setHelperMember] = useState(!helper ? c.profileOne : c.profileTwo)

    useEffect(() => {
        const fetchOnline = async () => {
            if (helperMember) {
                try {
                    await setProfileStatus(userId, 'ONL', Date.now())
                    let helper2 = helperMember
                    if (!helperMember.lastActive) {
                        helper2 = await setProfileStatus(helperMember.id, 'ONL', Date.now())
                    } else {
                        const lastActive = new Date(helperMember.lastActive)
                        const fiveMinutesAgo = Date.now() - 60000
                        if (lastActive.getTime() < fiveMinutesAgo) {
                            helper2 = await setProfileStatus(helperMember.id, 'OFF', helperMember.lastActive)
                        }
                    }
                    if (helperMember !== helper2) {
                        setHelperMember(helper2)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }

        fetchOnline()

        const interval = setInterval(fetchOnline, 60000)

        return () => clearInterval(interval)
    }, [])

    const navigate = useNavigate()
    const handleClick = (c) => {
        setCurrentConversation(c)
        navigate(`/conversations/${c.id}`)
    }
    return (
        <button onClick={() => handleClick(c)} key={c.id} className={`group px-2 py-2 rounded-md flex items-center gap-x-2 w-full transition mb-1 hover:bg-bg0 ${currentConversation?.id === c.id && "bg-bg0"}`}>
            <div className="relative">
                {
                    helperMember.imageUrl
                        ? <img className="w-8 h-8 rounded-full shadow-lg border border-bg0" src={helperMember.imageUrl} />
                        : <div className="w-8 h-8 rounded-full shadow-lg border border-bg0"></div>
                }
                <ServerMemberStatus status={helperMember.online} />
            </div>
            <p className={`font-semibold text-sm group-hover:text-black dark:group-hover:text-white transition ${currentConversation?.id === c.id && "text-black dark:text-white bg-bg0"}`}>
                {helperMember.name || helperMember.email}
            </p>
        </button>
    );
}

export default ConversationMember;