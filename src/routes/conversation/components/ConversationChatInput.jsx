/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import EmojiPicker from "../../server/components/channel/components/EmojiPicker";
import { createDirectMessage } from "../../../services/socket";

const ConversationChatInput = ({ currentConversation, otherProfile, userId }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [content, setContent] = useState('')
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (content !== "") {
            try {
                setIsLoading(true)
                await createDirectMessage(userId, currentConversation.id, content, "")
                setIsLoading(false)
                setContent("")
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleChange = (e) => {
        setContent(e.target.value)
    }

    const handleEmoji = (e) => {
        setContent((prev) => `${prev}${e}`)
    }

    if (!otherProfile || !currentConversation) {
        return <div>...</div>
    }
    return (
        <form onSubmit={(e) => { handleSubmit(e) }}>
            <div className="relative p-4 pb-6">
                <button type="button" disabled={isLoading} onClick={() => { document.getElementById('conversation_file_modal').showModal() }} className=" absolute top-7 left-8 h-6 w-6 bg-bg0 hover:scale-105 transition rounded-full p-1 flex items-center justify-center shadow">
                    <FontAwesomeIcon className="hover:text-black dark:hover:text-white" icon="fa-solid fa-plus" />
                </button>
                <input type="text" value={content} onChange={handleChange} placeholder={`Message @${otherProfile.name || otherProfile.email}`} className="input w-full px-14 py-6 bg-bg2 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black dark:text-white" />
                <div className="absolute top-7 right-[72px]">
                    <EmojiPicker handleEmoji={handleEmoji} />
                </div>
                <button type="submit" disabled={isLoading} className={`btn h-6 min-h-6 bg-transparent hover:bg-transparent border-0 p-0 absolute top-7 right-8 ${content === "" && "btn-disabled"}`}>
                    <FontAwesomeIcon className=" text-2xl transition hover:text-black dark:hover:text-white" icon="fa-solid fa-paper-plane" />
                </button>
            </div>
        </form>
    );
}

export default ConversationChatInput;