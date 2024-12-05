/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ServerSection = ({ label, role, sectionType, channelType, server, setType }) => {
    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase font-semibold">{label}</p>
            {
                role !== "GUEST" && sectionType === "channels" && (
                    <div className="tooltip" data-tip="Create Channel">
                        <button onClick={() => {
                            setType(channelType)
                            document.getElementById('create_channel_modal').showModal()
                        }} className="">
                            <FontAwesomeIcon icon="fa-solid fa-plus" />
                        </button>
                    </div>
                )
            }
            {
                role === "ADMIN" && sectionType === "members" && (
                    <div className="tooltip" data-tip="Manager Members">
                        <button onClick={() => document.getElementById('member_modal').showModal()} className="">
                            <FontAwesomeIcon icon="fa-solid fa-gear" />
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default ServerSection