/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

const ConversationSection = ({ conversations, userId, currentConversation, setCurrentConversation }) => {
    const navigate = useNavigate()
    const handleClick = (c) => {
        setCurrentConversation(c)
        navigate(`/conversations/${c.id}`)
    }

    return (
        <div className="flex flex-col items-start justify-between py-2">
            <p className="text-xs uppercase font-semibold mb-2">Direct messages</p>
            <div className="space-y-0.5 w-full">
                {
                    conversations?.map((c) => {
                        const helper = userId === c.profileOne.id 
                        return (
                            <button onClick={() => handleClick(c)} key={c.id} className={`group px-2 py-2 rounded-md flex items-center gap-x-2 w-full transition mb-1 hover:bg-bg0 ${currentConversation?.id === c.id && "bg-bg0"}`}>
                                <img className="w-8 h-8 rounded-full shadow-lg border border-bg0" src={!helper ? c.profileOne.imageUrl : c.profileTwo.imageUrl} />
                                <p className={`font-semibold text-sm group-hover:text-black dark:group-hover:text-white transition ${currentConversation?.id === c.id && "text-black dark:text-white bg-bg0"}`}>
                                    Cringe
                                </p>
                            </button>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ConversationSection;