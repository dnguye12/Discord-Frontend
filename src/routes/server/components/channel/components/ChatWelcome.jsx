/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChatWelcome = ({ channel }) => {
    if (!channel) {
        return <div>...Loading</div>
    }
    return (
        <div className="space-y-2 px-4 mb-4">
            <div className="h-[72px] w-[72px] bg-bg0 rounded-full flex items-center justify-center">
                <FontAwesomeIcon className="text-black dark:text-white text-5xl" icon="fa-solid fa-hashtag" />
            </div>
            <p className="text-xl md:text-3xl font-bold text-black dark:text-white tracking-wide">Welcome to #{channel.name}</p>
            <p className="text-sm">This is the start of #{channel.name}</p>
        </div>
    );
}

export default ChatWelcome;