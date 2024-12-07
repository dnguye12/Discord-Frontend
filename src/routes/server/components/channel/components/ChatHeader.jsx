/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChatHeader = ({ channel, setOpenSide }) => {
    return (
        <div className="text-md font-semibold px-3 flex items-center h-12 border-bg3 border-b border-t-0 border-x-0 shadow">
            <label onClick={() => setOpenSide(true)} htmlFor="mobile-drawer" className="md:hidden drawer-button btn btn-ghost mr-2">
            <FontAwesomeIcon icon="fa-solid fa-bars" />
            </label>
            {
                channel.type === "TEXT" && (
                    <FontAwesomeIcon icon="fa-solid fa-hashtag" />
                )
            }
            <p className="font-semibold text-md text-black dark:text-white ml-2">{channel.name}</p>
        </div>
    )
}

export default ChatHeader