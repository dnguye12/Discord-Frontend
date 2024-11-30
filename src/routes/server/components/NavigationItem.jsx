/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom"

const NavigationItem = ({ id, imageUrl, name }) => {
    const serverId = useParams().serverId
    const navigate = useNavigate()
    return (
        <div className="tooltip tooltip-right" data-tip={name}>
            <button onClick={() => {navigate(`/servers/${id}`)}} className="group relative flex items-center">
                <div className={`bg-bg2reversed absolute left-0 rounded-r-full transition-all w-[4px] ${serverId === id ? "h-[36px]" : "group-hover:h-[20px]"}`} />
                <div className={`relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden ${serverId === id ? "bg-primary text-white rounded-[16px]" : ""}`}>
                    <img src={`${import.meta.env.VITE_API_URL}/upload/files/${imageUrl}`} alt="Channel" />
                </div>
            </button>
        </div>
    )
}

export default NavigationItem