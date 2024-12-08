/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSocket } from "../../../providers/socket-provider";

const ConversationHeader = ({ otherProfile, setOpenSide }) => {
    const {isConnected} = useSocket()
    if (!otherProfile) {
        return <div>...Loading</div>
    }
    return (
        <div className="text-md font-semibold px-3 flex items-center h-12 border-bg3 border-b border-t-0 border-x-0 shadow">
            <label onClick={() => setOpenSide(true)} htmlFor="mobile-drawer-convo" className="md:hidden drawer-button btn btn-ghost mr-2">
            <FontAwesomeIcon icon="fa-solid fa-bars" />
            </label>

            <img className="w-6 h-6 shadow rounded-full" src={otherProfile.imageUrl} />

            <p className="font-semibold text-md text-black dark:text-white ml-2">{otherProfile.name}</p>
        </div>
    )
}

export default ConversationHeader