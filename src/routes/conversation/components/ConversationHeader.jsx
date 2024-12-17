/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConversationVideoButton from "./ConversationVideoButton";

const ConversationHeader = ({ otherProfile, setOpenSide }) => {
    if (!otherProfile) {
        return <div>...Loading</div>
    }
    return (
        <div className="text-md font-semibold px-3 flex items-center h-12 border-bg3 border-b border-t-0 border-x-0 shadow-md">
            <label onClick={() => setOpenSide(true)} htmlFor="mobile-drawer-convo" className="md:hidden drawer-button btn btn-ghost mr-2">
                <FontAwesomeIcon icon="fa-solid fa-bars" />
            </label>

            {
                otherProfile.imageUrl
                    ?
                    <img className="w-6 h-6 shadow rounded-full" src={otherProfile.imageUrl} />
                    :
                    <div className="w-6 h-6 shadow rounded-full border border-bg0"></div>
            }

            <p className="font-semibold text-md text-black dark:text-white ml-2">{otherProfile.name || otherProfile.email}</p>
            <div className="absolute right-0">
                <ConversationVideoButton />
            </div>
        </div>
    )
}

export default ConversationHeader