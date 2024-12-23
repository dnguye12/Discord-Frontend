/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const ServerHeader = ({ server, role }) => {
    const navigate = useNavigate()
    const isAdmin = role === 'ADMIN'
    const isModerator = isAdmin || role === 'MODERATOR'
    if(!server) {
        return <div>...Loading</div>
    }
    return (
        <div>
            <details className="dropdown-ServerHeader dropdown w-full">
                <summary className="btn justify-between items-center w-full text-md font-semibold px-4 h-12 hover:text-black hover:dark:text-white rounded-none bg-bg2 hover:bg-bg0 border-x-none border-t-none border-b border-b-bg3">{server.name} <FontAwesomeIcon icon="fa-solid fa-chevron-down" /></summary>
                
                <ul className="menu dropdown-content shadow w-56 text-sm font-medium space-y-0.5 bg-bg3 m-2 rounded-lg px-2 py-1.5 z-50">
                    {
                        isModerator && (
                            <li onClick={()=>document.getElementById('invite_modal').showModal()} className="text-primary "><a>Invite People <FontAwesomeIcon className="ml-auto" icon="fa-solid fa-user-plus" /></a></li>
                        )
                    }
                    {
                        isAdmin && (
                            <li onClick={()=>document.getElementById('edit_server_modal').showModal()} className=""><a>Server Settings <FontAwesomeIcon className="ml-auto" icon="fa-solid fa-gear" /></a></li>
                        )
                    }
                    {
                        isAdmin && (
                            <li onClick={()=>{navigate(`/servers/${server.id}/stats`)}} className=""><a>Server Stats <FontAwesomeIcon className="ml-auto" icon="fa-solid fa-chart-simple" /></a></li>
                        )
                    }
                    {
                        isAdmin && (
                            <li onClick={()=>document.getElementById('member_modal').showModal()} className=""><a>Manage members <FontAwesomeIcon className="ml-auto" icon="fa-solid fa-users" /></a></li>
                        )
                    }
                    {
                        isModerator && (
                            <li onClick={()=>document.getElementById('create_channel_modal').showModal()} className=""><a>Create Channels <FontAwesomeIcon className="ml-auto" icon="fa-solid fa-circle-plus" /></a></li>
                        )
                    }
                    {
                        isModerator && (
                            <div className="divider"></div>
                        )
                    }
                    {
                        isAdmin && (
                            <li onClick={()=>document.getElementById('delete_server_modal').showModal()} className="text-red hover:!bg-red"><a>Delete Server <FontAwesomeIcon className="ml-auto" icon="fa-solid fa-trash-can" /></a></li>
                        )
                    }
                    {
                        !isAdmin && (
                            <li onClick={()=>document.getElementById('leave_server_modal').showModal()} className="text-red hover:!bg-red"><a>Leave Server <FontAwesomeIcon className="ml-auto" icon="fa-solid fa-door-open" /></a></li>
                        )
                    }
                </ul>
            </details>
        </div>
    )
}

export default ServerHeader