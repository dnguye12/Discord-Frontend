import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const ConversationChatInput = ({ apiUrl, otherProfile }) => {
    const [isLoading, setIsloading] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <form onSubmit={(e) => { handleSubmit(e) }}>
            <div className="relative p-4 pb-6">
                <button className=" absolute top-7 left-8 h-6 w-6 bg-bg0 hover:scale-105 transition rounded-full p-1 flex items-center justify-center shadow">
                    <FontAwesomeIcon className="hover:text-black dark:hover:text-white" icon="fa-solid fa-plus" />
                </button>
                <input type="text" placeholder={`Message @${otherProfile.name}`} className="input w-full px-14 py-6 bg-bg2 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black dark:text-white" />
                <div className="absolute top-7 right-8">
                    <FontAwesomeIcon className=" text-2xl transition hover:text-black dark:hover:text-white" icon="fa-solid fa-face-smile" />
                </div>
            </div>
        </form>
    );
}

export default ConversationChatInput;